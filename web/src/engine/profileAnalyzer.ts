import { questions, QuestionOption, TeaId } from '../data/questions';

export type PreferenceSignalKey =
    | 'refreshing'
    | 'classic'
    | 'adventurous'
    | 'dessertLike'
    | 'balanced'
    | 'softExotic'
    | 'fruity'
    | 'minty'
    | 'blackTeaForward'
    | 'icedFriendly'
    | 'afterMeal'
    | 'calmFocus';

export type ArchetypeId =
    | 'classicFocus'
    | 'balancedDaily'
    | 'fruityRefresh'
    | 'coolDessert'
    | 'softExoticBalance';

interface ArchetypeDefinition {
    id: ArchetypeId;
    nameKo: string;
    oneLiner: string;
    representativeTraits: string[];
    teaDirection: {
        primary: TeaId[];
        secondary: TeaId[];
        note: string;
    };
    signalWeights: Partial<Record<PreferenceSignalKey, number>>;
}

export interface Archetype {
    id: ArchetypeId;
    nameKo: string;
    oneLiner: string;
    representativeTraits: string[];
    teaDirection: {
        primary: TeaId[];
        secondary: TeaId[];
        note: string;
    };
    score: number;
}

export interface ExplanationSignal {
    key: PreferenceSignalKey;
    score: number;
    label: string;
    description: string;
}

export interface PreferenceProfileAnalysis {
    profileScores: Record<PreferenceSignalKey, number>;
    archetype: Archetype;
    explanationSignals: ExplanationSignal[];
}

const signalKeys: PreferenceSignalKey[] = [
    'refreshing',
    'classic',
    'adventurous',
    'dessertLike',
    'balanced',
    'softExotic',
    'fruity',
    'minty',
    'blackTeaForward',
    'icedFriendly',
    'afterMeal',
    'calmFocus',
];

const signalLabels: Record<PreferenceSignalKey, string> = {
    refreshing: '리프레시 성향',
    classic: '클래식 선호',
    adventurous: '탐색 성향',
    dessertLike: '디저트감 선호',
    balanced: '균형감 선호',
    softExotic: '부드러운 이국성 선호',
    fruity: '프루티 선호',
    minty: '민티 선호',
    blackTeaForward: '홍차 중심 선호',
    icedFriendly: '아이스 친화 성향',
    afterMeal: '식후 적합 성향',
    calmFocus: '차분한 집중 성향',
};

const signalDescriptions: Record<PreferenceSignalKey, string> = {
    refreshing: '맑고 가벼운 전환감을 선호하는 경향이 나타났습니다.',
    classic: '익숙하고 단정한 티 스타일을 선호하는 신호가 강합니다.',
    adventurous: '익숙한 선택보다 새로운 조합을 열어두는 성향이 보입니다.',
    dessertLike: '부드럽고 만족감 있는 여운을 선호하는 성향이 보입니다.',
    balanced: '강한 쏠림보다 안정적인 밸런스를 선호하는 경향입니다.',
    softExotic: '과하지 않은 이국적 포인트를 편안하게 받아들이는 편입니다.',
    fruity: '과일감이 있는 밝은 향미를 선호하는 경향이 있습니다.',
    minty: '민트 계열의 시원한 존재감을 선호하는 편입니다.',
    blackTeaForward: '홍차 기반의 구조적인 풍미를 선호하는 경향입니다.',
    icedFriendly: '차갑게 즐겼을 때의 선명함을 선호하는 성향입니다.',
    afterMeal: '식후 전환용으로 어울리는 티를 찾는 경향이 강합니다.',
    calmFocus: '차분하게 집중할 수 있는 무드를 중요하게 보는 편입니다.',
};

const archetypeDefinitions: ArchetypeDefinition[] = [
    {
        id: 'classicFocus',
        nameKo: '클래식 포커스형',
        oneLiner: '단정한 구조감과 집중감을 우선하는 타입입니다.',
        representativeTraits: ['클래식 선호', '홍차 중심', '차분한 몰입'],
        teaDirection: {
            primary: ['britishBlack'],
            secondary: ['asianGold', 'mintyChocolat'],
            note: '홍차 기반의 구조감이 또렷한 티에 높은 만족도를 보입니다.',
        },
        signalWeights: {
            classic: 1.45,
            blackTeaForward: 1.35,
            calmFocus: 1.2,
            balanced: 0.85,
        },
    },
    {
        id: 'balancedDaily',
        nameKo: '밸런스 데일리형',
        oneLiner: '과하지 않게 매일 즐길 수 있는 균형을 선호하는 타입입니다.',
        representativeTraits: ['균형감', '유연한 음용 상황', '데일리 루틴'],
        teaDirection: {
            primary: ['asianGold'],
            secondary: ['britishBlack', 'hibiscusFruit'],
            note: '강한 쏠림보다 조화로운 레이어가 이어지는 티와 잘 맞습니다.',
        },
        signalWeights: {
            balanced: 1.5,
            softExotic: 0.95,
            calmFocus: 1.0,
            afterMeal: 0.85,
        },
    },
    {
        id: 'fruityRefresh',
        nameKo: '프루티 리프레시형',
        oneLiner: '밝은 과일감과 산뜻한 전환감을 중시하는 타입입니다.',
        representativeTraits: ['프루티 선호', '리프레시 무드', '아이스 친화'],
        teaDirection: {
            primary: ['hibiscusFruit'],
            secondary: ['asianGold', 'mintyChocolat'],
            note: '산뜻한 과일 계열과 클린한 마무리를 가진 티에 적합합니다.',
        },
        signalWeights: {
            refreshing: 1.5,
            fruity: 1.45,
            icedFriendly: 1.2,
            afterMeal: 0.8,
        },
    },
    {
        id: 'coolDessert',
        nameKo: '쿨 디저트형',
        oneLiner: '디저트 같은 만족감과 쿨한 마무리를 함께 찾는 타입입니다.',
        representativeTraits: ['디저트감', '민트 포인트', '식후 전환'],
        teaDirection: {
            primary: ['mintyChocolat'],
            secondary: ['britishBlack', 'asianGold'],
            note: '카카오의 여운과 시원한 대비가 공존하는 티를 선호합니다.',
        },
        signalWeights: {
            dessertLike: 1.45,
            minty: 1.35,
            afterMeal: 1.15,
            refreshing: 0.9,
        },
    },
    {
        id: 'softExoticBalance',
        nameKo: '소프트 이국 밸런스형',
        oneLiner: '은은한 이국성과 부드러운 균형을 즐기는 타입입니다.',
        representativeTraits: ['부드러운 이국성', '중간 강도', '정돈된 여운'],
        teaDirection: {
            primary: ['asianGold'],
            secondary: ['hibiscusFruit', 'britishBlack'],
            note: '허브-시트러스 결의 부드러운 변주를 가진 티와 잘 맞습니다.',
        },
        signalWeights: {
            softExotic: 1.9,
            balanced: 0.9,
            fruity: 0.85,
            calmFocus: 0.7,
            adventurous: 0.6,
        },
    },
];

const archetypeTieOrder: ArchetypeId[] = [
    'balancedDaily',
    'classicFocus',
    'fruityRefresh',
    'coolDessert',
    'softExoticBalance',
];

const optionLookup = questions.reduce<Record<string, Record<string, QuestionOption>>>((acc, question) => {
    acc[question.id] = question.options.reduce<Record<string, QuestionOption>>((optionAcc, option) => {
        optionAcc[option.value] = option;
        return optionAcc;
    }, {});
    return acc;
}, {});

const toSignalDelta = (questionId: string, optionValue: string): Partial<Record<PreferenceSignalKey, number>> => {
    const deltas: Partial<Record<PreferenceSignalKey, number>> = {};

    if (questionId === 'aroma') {
        if (optionValue.includes('fruity')) deltas.fruity = 2;
        if (optionValue.includes('mint')) deltas.minty = 2;
        if (optionValue.includes('black_tea')) deltas.blackTeaForward = 2;
        if (optionValue.includes('herbal')) deltas.softExotic = 2;
    }

    if (questionId === 'temperature') {
        if (optionValue === 'iced') deltas.icedFriendly = 2;
        if (optionValue === 'both') deltas.icedFriendly = 1;
    }

    if (questionId === 'timing' && optionValue === 'after_meal') {
        deltas.afterMeal = 2;
    }

    if (questionId === 'situation') {
        if (optionValue.includes('after_meal')) deltas.afterMeal = 2;
        if (optionValue.includes('deep_work')) deltas.calmFocus = 2;
    }

    if (questionId === 'mood') {
        if (optionValue.includes('calm')) deltas.calmFocus = 2;
        if (optionValue.includes('soft')) deltas.softExotic = 1;
    }

    if (questionId === 'finish') {
        if (optionValue.includes('dessert')) deltas.dessertLike = 2;
        if (optionValue.includes('refresh')) deltas.refreshing = 1;
    }

    return deltas;
};

const scoreArchetype = (
    profileScores: Record<PreferenceSignalKey, number>,
    definition: ArchetypeDefinition,
): number => {
    return Object.entries(definition.signalWeights).reduce((sum, [signalKey, weight]) => {
        const current = profileScores[signalKey as PreferenceSignalKey] || 0;
        return sum + current * (weight || 0);
    }, 0);
};

const pickArchetype = (profileScores: Record<PreferenceSignalKey, number>): Archetype => {
    const scored = archetypeDefinitions.map((definition) => ({
        ...definition,
        score: scoreArchetype(profileScores, definition),
    }));

    scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return archetypeTieOrder.indexOf(a.id) - archetypeTieOrder.indexOf(b.id);
    });

    const winner = scored[0];
    return {
        id: winner.id,
        nameKo: winner.nameKo,
        oneLiner: winner.oneLiner,
        representativeTraits: winner.representativeTraits,
        teaDirection: winner.teaDirection,
        score: Number(winner.score.toFixed(2)),
    };
};

export const analyzePreferenceProfile = (answers: Record<string, string | string[]>): PreferenceProfileAnalysis => {
    const rawScores = signalKeys.reduce<Record<PreferenceSignalKey, number>>((acc, key) => {
        acc[key] = 0;
        return acc;
    }, {} as Record<PreferenceSignalKey, number>);

    let selectedOptionCount = 0;

    questions.forEach((question) => {
        const answer = answers[question.id];
        if (!answer) return;

        const selectedValues = Array.isArray(answer) ? answer : [answer];
        selectedValues.forEach((value) => {
            const option = optionLookup[question.id]?.[value];
            if (!option) return;
            selectedOptionCount += 1;

            Object.entries(option.profileSignals).forEach(([signalKey, score]) => {
                if (score === undefined) return;
                const mapped =
                    signalKey === 'desserty'
                        ? 'dessertLike'
                        : (signalKey as Exclude<PreferenceSignalKey, 'dessertLike'>);
                rawScores[mapped] += score;
            });

            const extraDeltas = toSignalDelta(question.id, value);
            Object.entries(extraDeltas).forEach(([signalKey, delta]) => {
                if (delta === undefined) return;
                rawScores[signalKey as PreferenceSignalKey] += delta;
            });
        });
    });

    const normalizationBase = Math.max(1, selectedOptionCount * 2.4);
    const profileScores = signalKeys.reduce<Record<PreferenceSignalKey, number>>((acc, key) => {
        const ratio = rawScores[key] / normalizationBase;
        const normalized = Math.max(0, Math.min(100, Math.round((ratio + 0.2) * 100)));
        acc[key] = normalized;
        return acc;
    }, {} as Record<PreferenceSignalKey, number>);

    const explanationSignals = [...signalKeys]
        .sort((a, b) => profileScores[b] - profileScores[a] || a.localeCompare(b))
        .slice(0, 4)
        .map((key) => ({
            key,
            score: profileScores[key],
            label: signalLabels[key],
            description: signalDescriptions[key],
        }));

    return {
        profileScores,
        archetype: pickArchetype(profileScores),
        explanationSignals,
    };
};
