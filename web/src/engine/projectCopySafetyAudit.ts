declare const process: { cwd(): string };

const fsModuleName = 'node:fs';
const pathModuleName = 'node:path';
const fs = await import(fsModuleName);
const path = await import(pathModuleName);
const { readdirSync, readFileSync, statSync } = fs;
const { extname, join, relative } = path;

type Severity = 'high' | 'medium' | 'low';

interface Hit {
    file: string;
    line: number;
    severity: Severity;
    keyword: string;
    snippet: string;
}

interface Rule {
    severity: Severity;
    regex: RegExp;
    keywords: string[];
}

const projectRoot = process.cwd();
const srcRoot = join(projectRoot, 'src');

const includePathHints = [
    '/components/',
    '/sections/',
    '/data/',
    '/LandingPage.tsx',
];

const excludePathHints = [
    '/engine/',
    '/main.tsx',
    '/vite-env.d.ts',
];

const codeExtensionSet = new Set(['.ts', '.tsx']);

const rules: Rule[] = [
    {
        severity: 'high',
        regex: /(치료|예방|완화|개선|효능|항염|항균|해독|디톡스|cure|treat(?:ment)?|detox|anti-?inflammatory|antiviral|cleanse|healing|boost|improve|relief)/gi,
        keywords: [
            '치료',
            '예방',
            '완화',
            '개선',
            '효능',
            '항염',
            '항균',
            '해독',
            '디톡스',
            'cure',
            'treat',
            'treatment',
            'detox',
            'anti-inflammatory',
            'antiviral',
            'cleanse',
            'healing',
            'boost',
            'improve',
            'relief',
        ],
    },
    {
        severity: 'medium',
        regex: /(면역|호흡기|혈당|혈압|체지방|immune|respiratory|metabolism|fat\s*burn)/gi,
        keywords: [
            '면역',
            '호흡기',
            '혈당',
            '혈압',
            '체지방',
            'immune',
            'respiratory',
            'metabolism',
            'fat burn',
        ],
    },
    {
        severity: 'low',
        regex: /(효과|health|wellness|recovery)/gi,
        keywords: ['효과', 'health', 'wellness', 'recovery'],
    },
];

const shouldIgnoreLine = (line: string): boolean => {
    const lowered = line.toLowerCase();

    if (lowered.includes('단정하지 않고') || lowered.includes('단정적 기능 표현 없이')) {
        return true;
    }

    if (lowered.includes('bannedclaimregex')) {
        return true;
    }

    if (
        lowered.includes('/images/detox_order/') ||
        lowered.includes('maskimage') ||
        lowered.includes('webkitmaskimage')
    ) {
        return true;
    }

    if (
        lowered.includes('immune_b.svg') ||
        lowered.includes('antiviral_b.svg') ||
        lowered.includes('recovery_a.svg')
    ) {
        return true;
    }

    if (lowered.trim().startsWith('//') || lowered.trim().startsWith('/*')) {
        return true;
    }

    return false;
};

const shouldIgnoreLiteral = (literal: string): boolean => {
    const lowered = literal.toLowerCase();

    if (
        literal.includes('${') ||
        lowered.includes('/images/') ||
        lowered.includes('detox_order') ||
        lowered.includes('.svg') ||
        lowered.includes('.webp') ||
        lowered.includes('.png') ||
        lowered.includes('.mp4')
    ) {
        return true;
    }

    if (lowered === 'health' || lowered === 'respiratory' || lowered === 'immunity') {
        return true;
    }

    return false;
};

const extractStringLiterals = (line: string): string[] => {
    const literals: string[] = [];
    const regex = /(['"`])((?:\\.|(?!\1).)*)\1/g;
    let match: RegExpExecArray | null = regex.exec(line);

    while (match) {
        literals.push(match[2]);
        match = regex.exec(line);
    }

    return literals;
};

const collectFiles = (root: string): string[] => {
    const stack = [root];
    const files: string[] = [];

    while (stack.length > 0) {
        const current = stack.pop();
        if (!current) continue;

        const entries = readdirSync(current);
        entries.forEach((entry: string) => {
            const absolutePath = join(current, entry);
            const stat = statSync(absolutePath);

            if (stat.isDirectory()) {
                stack.push(absolutePath);
                return;
            }

            if (!codeExtensionSet.has(extname(absolutePath))) {
                return;
            }

            const normalized = absolutePath.replace(/\\/g, '/');
            const shouldInclude = includePathHints.some((hint) => normalized.includes(hint));
            const shouldExclude = excludePathHints.some((hint) => normalized.includes(hint));

            if (shouldInclude && !shouldExclude) {
                files.push(absolutePath);
            }
        });
    }

    return files.sort((a, b) => a.localeCompare(b));
};

const findHits = (file: string): Hit[] => {
    const lines = readFileSync(file, 'utf-8').split('\n');
    const result: Hit[] = [];

    lines.forEach((line: string, index: number) => {
        if (shouldIgnoreLine(line)) {
            return;
        }

        const literals = extractStringLiterals(line);
        if (literals.length === 0) {
            return;
        }

        literals.forEach((literal) => {
            if (shouldIgnoreLiteral(literal)) {
                return;
            }

            rules.forEach((rule) => {
                const match = literal.match(rule.regex);
                if (!match || match.length === 0) {
                    return;
                }

                match.forEach((value: string) => {
                    const normalized = value.toLowerCase();
                    const keyword =
                        rule.keywords.find((item) => normalized === item.toLowerCase()) || value;

                    result.push({
                        file: relative(projectRoot, file).replace(/\\/g, '/'),
                        line: index + 1,
                        severity: rule.severity,
                        keyword,
                        snippet: literal.trim().slice(0, 220),
                    });
                });
            });
        });
    });

    return result;
};

const rankSeverity = (a: Severity, b: Severity): number => {
    const order: Record<Severity, number> = { high: 3, medium: 2, low: 1 };
    return order[b] - order[a];
};

const targetFiles = collectFiles(srcRoot);
const allHits = targetFiles.flatMap((file) => findHits(file));

const byFile = allHits.reduce<Record<string, Hit[]>>((acc, hit) => {
    if (!acc[hit.file]) {
        acc[hit.file] = [];
    }
    acc[hit.file].push(hit);
    return acc;
}, {});

Object.values(byFile).forEach((hits) => {
    hits.sort((a, b) => rankSeverity(a.severity, b.severity) || a.line - b.line || a.keyword.localeCompare(b.keyword));
});

const severityCount = allHits.reduce<Record<Severity, number>>(
    (acc, hit) => {
        acc[hit.severity] += 1;
        return acc;
    },
    { high: 0, medium: 0, low: 0 },
);

const report = {
    scannedFileCount: targetFiles.length,
    issueCount: allHits.length,
    severityCount,
    fileResults: Object.entries(byFile)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([file, hits]) => ({
            file,
            issueCount: hits.length,
            items: hits,
        })),
};

console.log(JSON.stringify(report, null, 2));
