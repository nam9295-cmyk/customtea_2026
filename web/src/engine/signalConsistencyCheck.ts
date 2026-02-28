declare const process: { cwd(): string; exitCode?: number };

const fsModuleName = 'node:fs';
const pathModuleName = 'node:path';
const fs = await import(fsModuleName);
const path = await import(pathModuleName);
const { readFileSync } = fs;
const { join } = path;
import { ProfileSignalKey, questions } from '../data/questions';
import { teaSignalAffinity } from './calculator';
import { baseToPreferenceSignalKey, preferenceSignalKeys, PreferenceSignalKey } from './profileAnalyzer';

type Severity = 'high' | 'medium' | 'low';

interface Finding {
    severity: Severity;
    type:
        | 'missing-map'
        | 'missing-preference'
        | 'dead-question-key'
        | 'dead-preference-key'
        | 'dead-calculator-key'
        | 'recommendation-content-gap';
    message: string;
}

const projectRoot = process.cwd();
const questionsFilePath = join(projectRoot, 'src/data/questions.ts');
const recommendationContentPath = join(projectRoot, 'src/data/recommendationContent.ts');

const parseQuestionSignalTypeKeys = (): Set<ProfileSignalKey> => {
    const source = readFileSync(questionsFilePath, 'utf-8');
    const typeBlockMatch = source.match(/export type ProfileSignalKey\s*=([\s\S]*?);/);
    if (!typeBlockMatch) {
        return new Set();
    }

    const keyMatches = [...typeBlockMatch[1].matchAll(/'([A-Za-z][A-Za-z0-9]*)'/g)].map((m) => m[1] as ProfileSignalKey);
    return new Set(keyMatches);
};

const collectQuestionUsedKeys = (): Set<ProfileSignalKey> => {
    const keys = new Set<ProfileSignalKey>();
    questions.forEach((question) => {
        question.options.forEach((option) => {
            (Object.keys(option.profileSignals) as ProfileSignalKey[]).forEach((key) => {
                keys.add(key);
            });
        });
    });
    return keys;
};

const collectBaseMapKeys = (): Set<ProfileSignalKey> => {
    return new Set(Object.keys(baseToPreferenceSignalKey) as ProfileSignalKey[]);
};

const collectBaseMapTargets = (): Set<PreferenceSignalKey> => {
    return new Set(
        Object.values(baseToPreferenceSignalKey).filter((key): key is PreferenceSignalKey => Boolean(key)),
    );
};

const collectCalculatorAffinityKeys = (): Set<PreferenceSignalKey> => {
    const keys = new Set<PreferenceSignalKey>();
    Object.values(teaSignalAffinity).forEach((affinityMap) => {
        (Object.keys(affinityMap) as PreferenceSignalKey[]).forEach((key) => keys.add(key));
    });
    return keys;
};

const collectRecommendationReferencedSignals = (): Set<PreferenceSignalKey> => {
    const source = readFileSync(recommendationContentPath, 'utf-8');
    const keys = new Set<PreferenceSignalKey>();
    preferenceSignalKeys.forEach((key) => {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        if (regex.test(source)) {
            keys.add(key);
        }
    });
    return keys;
};

const sorted = <T extends string>(set: Set<T>): T[] => [...set].sort((a, b) => a.localeCompare(b));

const difference = <T extends string>(source: Set<T>, target: Set<T>): Set<T> => {
    const out = new Set<T>();
    source.forEach((item) => {
        if (!target.has(item)) {
            out.add(item);
        }
    });
    return out;
};

const questionTypeKeys = parseQuestionSignalTypeKeys();
const questionUsedKeys = collectQuestionUsedKeys();
const baseMapKeys = collectBaseMapKeys();
const baseMapTargets = collectBaseMapTargets();
const preferenceKeys = new Set(preferenceSignalKeys);
const calculatorAffinityKeys = collectCalculatorAffinityKeys();
const recommendationSignalRefs = collectRecommendationReferencedSignals();

const findings: Finding[] = [];

const missingFromMap = difference(questionUsedKeys, baseMapKeys);
sorted(missingFromMap).forEach((key) => {
    findings.push({
        severity: 'high',
        type: 'missing-map',
        message: `questions.ts uses '${key}' but baseToPreferenceSignalKey has no mapping.`,
    });
});

const mapTargetsMissingInPreference = difference(baseMapTargets, preferenceKeys);
sorted(mapTargetsMissingInPreference).forEach((key) => {
    findings.push({
        severity: 'high',
        type: 'missing-preference',
        message: `baseToPreferenceSignalKey maps to '${key}' but this key is not in PreferenceSignalKey list.`,
    });
});

const deadQuestionTypeKeys = difference(questionTypeKeys, questionUsedKeys);
sorted(deadQuestionTypeKeys).forEach((key) => {
    findings.push({
        severity: 'medium',
        type: 'dead-question-key',
        message: `ProfileSignalKey '${key}' is declared in questions.ts but not used by any option.`,
    });
});

const deadPreferenceKeys = difference(preferenceKeys, calculatorAffinityKeys);
sorted(deadPreferenceKeys).forEach((key) => {
    findings.push({
        severity: 'medium',
        type: 'dead-preference-key',
        message: `Preference signal '${key}' is defined but not used in calculator teaSignalAffinity.`,
    });
});

const deadCalculatorKeys = difference(calculatorAffinityKeys, preferenceKeys);
sorted(deadCalculatorKeys).forEach((key) => {
    findings.push({
        severity: 'high',
        type: 'dead-calculator-key',
        message: `Calculator affinity key '${key}' is used but not declared in PreferenceSignalKey.`,
    });
});

const recommendationGaps = difference(preferenceKeys, recommendationSignalRefs);
if (recommendationSignalRefs.size > 0) {
    sorted(recommendationGaps).forEach((key) => {
        findings.push({
            severity: 'low',
            type: 'recommendation-content-gap',
            message: `Signal '${key}' is not explicitly referenced in recommendationContent.ts (informational).`,
        });
    });
}

const severityCount = findings.reduce<Record<Severity, number>>(
    (acc, finding) => {
        acc[finding.severity] += 1;
        return acc;
    },
    { high: 0, medium: 0, low: 0 },
);

const report = {
    status: severityCount.high > 0 ? 'fail' : 'pass',
    questionTypeKeys: sorted(questionTypeKeys),
    questionUsedKeys: sorted(questionUsedKeys),
    baseMapKeys: sorted(baseMapKeys),
    baseMapTargets: sorted(baseMapTargets),
    preferenceKeys: sorted(preferenceKeys),
    calculatorAffinityKeys: sorted(calculatorAffinityKeys),
    recommendationContentSignalRefs: sorted(recommendationSignalRefs),
    findingCount: findings.length,
    severityCount,
    findings,
};

console.log(JSON.stringify(report, null, 2));

if (severityCount.high > 0) {
    process.exitCode = 1;
}
