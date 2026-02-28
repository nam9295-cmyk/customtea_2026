import { questions, Question, TeaId } from '../data/questions';
import {
    analyzePreferenceProfile,
    Archetype,
    ExplanationSignal,
    PreferenceSignalKey,
} from './profileAnalyzer';

type AxisId = Question['axis'];
type WeightMap = Record<TeaId, number>;
type OptionWeightLookup = Record<string, Record<string, WeightMap>>;

export interface TeaScore {
    id: TeaId;
    name: string;
    ratio: number;
    rawScore: number;
    adjustedScore: number;
}

export interface RecommendationResult {
    answers: Record<string, string | string[]>;
    profileScores: Record<PreferenceSignalKey, number>;
    archetype: Archetype;
    explanationSignals: ExplanationSignal[];
    teaScores: TeaScore[];
    topTea: TeaScore;
    secondTea: TeaScore;
}

const teaNameById: Record<TeaId, string> = {
    britishBlack: '브리티쉬 블랙',
    asianGold: '아시안 골드',
    hibiscusFruit: '히비스커스 프룻',
    mintyChocolat: '민티 쇼콜라',
};

const teaIds: TeaId[] = Object.keys(teaNameById) as TeaId[];
const axisBlendWeight = 0.3;
const profileAffinityWeight = 0.18;
const axisIds = Array.from(new Set(questions.map((question) => question.axis))) as AxisId[];

const optionWeightLookup: OptionWeightLookup = questions.reduce<OptionWeightLookup>((acc, question) => {
    const questionOptions = question.options.reduce<Record<string, WeightMap>>((optionsAcc, option) => {
        optionsAcc[option.value] = option.weights;
        return optionsAcc;
    }, {});

    acc[question.id] = questionOptions;
    return acc;
}, {});

const teaSignalAffinity: Record<TeaId, Partial<Record<PreferenceSignalKey, number>>> = {
    britishBlack: {
        classic: 1.5,
        blackTeaForward: 1.4,
        calmFocus: 1.2,
        balanced: 1.0,
        dessertLike: 0.9,
        refreshing: 0.4,
    },
    asianGold: {
        balanced: 1.4,
        softExotic: 1.4,
        calmFocus: 1.0,
        afterMeal: 0.8,
        fruity: 0.7,
        refreshing: 0.8,
    },
    hibiscusFruit: {
        refreshing: 1.5,
        fruity: 1.5,
        icedFriendly: 1.3,
        afterMeal: 0.9,
        balanced: 0.8,
        classic: 0.3,
    },
    mintyChocolat: {
        minty: 1.6,
        dessertLike: 1.4,
        afterMeal: 1.2,
        refreshing: 1.0,
        blackTeaForward: 0.8,
        balanced: 0.7,
    },
};

const normalizeScoreBoard = (scores: Record<TeaId, number>) => {
    const minScore = Math.min(...teaIds.map((id) => scores[id]));
    const normalizedBase = minScore < 0 ? Math.abs(minScore) : 0;

    return teaIds.reduce<Record<TeaId, number>>((acc, teaId) => {
        acc[teaId] = Math.max(0, scores[teaId] + normalizedBase);
        return acc;
    }, {} as Record<TeaId, number>);
};

const ratioFromScores = (scores: Record<TeaId, number>) => {
    const totalScore = teaIds.reduce((sum, teaId) => sum + scores[teaId], 0);
    const ratios = teaIds.reduce<Record<TeaId, number>>((acc, teaId) => {
        acc[teaId] = totalScore > 0 ? Math.round((scores[teaId] / totalScore) * 100) : 25;
        return acc;
    }, {} as Record<TeaId, number>);

    const ratioSum = teaIds.reduce((sum, teaId) => sum + ratios[teaId], 0);
    if (ratioSum !== 100) {
        const highestTea = [...teaIds].sort((a, b) => ratios[b] - ratios[a] || a.localeCompare(b))[0];
        ratios[highestTea] += (100 - ratioSum);
    }

    return ratios;
};

const computeProfileAffinity = (
    teaId: TeaId,
    profileScores: Record<PreferenceSignalKey, number>,
) => {
    const affinities = teaSignalAffinity[teaId];
    return Object.entries(affinities).reduce((sum, [signalKey, weight]) => {
        const signalScore = profileScores[signalKey as PreferenceSignalKey] || 0;
        return sum + signalScore * (weight || 0);
    }, 0);
};

export const calculateRecommendation = (
    userAnswers: Record<string, string | string[]>,
): RecommendationResult => {
    const { profileScores, archetype, explanationSignals } = analyzePreferenceProfile(userAnswers);

    const directScores: Record<TeaId, number> = {
        britishBlack: 0,
        asianGold: 0,
        hibiscusFruit: 0,
        mintyChocolat: 0,
    };
    const axisScores = axisIds.reduce<Record<AxisId, Record<TeaId, number>>>((acc, axis) => {
        acc[axis] = {
            britishBlack: 0,
            asianGold: 0,
            hibiscusFruit: 0,
            mintyChocolat: 0,
        };
        return acc;
    }, {} as Record<AxisId, Record<TeaId, number>>);
    const axisAnswerCount = axisIds.reduce<Record<AxisId, number>>((acc, axis) => {
        acc[axis] = 0;
        return acc;
    }, {} as Record<AxisId, number>);

    questions.forEach((question: Question) => {
        const answer = userAnswers[question.id];
        if (!answer) return;

        const selectedValues = Array.isArray(answer) ? answer : [answer];
        const questionLookup = optionWeightLookup[question.id];
        const axis = question.axis;

        selectedValues.forEach((value) => {
            const optionWeights = questionLookup?.[value];
            if (!optionWeights) return;
            axisAnswerCount[axis] += 1;

            teaIds.forEach((teaId) => {
                const weight = optionWeights[teaId] || 0;
                directScores[teaId] += weight;
                axisScores[axis][teaId] += weight;
            });
        });
    });

    const blendedScores = teaIds.reduce<Record<TeaId, number>>((acc, teaId) => {
        let normalizedAxisScore = 0;

        axisIds.forEach((axis) => {
            const count = axisAnswerCount[axis];
            if (!count) return;
            const mean = axisScores[axis][teaId] / count;
            normalizedAxisScore += Math.max(-2, Math.min(2, mean));
        });

        acc[teaId] = directScores[teaId] * (1 - axisBlendWeight) + normalizedAxisScore * axisBlendWeight;
        return acc;
    }, {} as Record<TeaId, number>);

    const normalizedBaseScores = normalizeScoreBoard(blendedScores);
    const profileAffinities = teaIds.reduce<Record<TeaId, number>>((acc, teaId) => {
        acc[teaId] = computeProfileAffinity(teaId, profileScores);
        return acc;
    }, {} as Record<TeaId, number>);
    const normalizedAffinities = normalizeScoreBoard(profileAffinities);

    const adjustedScores = teaIds.reduce<Record<TeaId, number>>((acc, teaId) => {
        const base = normalizedBaseScores[teaId];
        const affinity = normalizedAffinities[teaId];
        acc[teaId] = base * (1 - profileAffinityWeight) + affinity * profileAffinityWeight;
        return acc;
    }, {} as Record<TeaId, number>);

    const ratios = ratioFromScores(adjustedScores);
    const teaScores: TeaScore[] = teaIds.map((teaId) => ({
        id: teaId,
        name: teaNameById[teaId],
        rawScore: Number(normalizedBaseScores[teaId].toFixed(3)),
        adjustedScore: Number(adjustedScores[teaId].toFixed(3)),
        ratio: ratios[teaId],
    }));

    teaScores.sort((a, b) => {
        const ratioGap = b.ratio - a.ratio;
        if (ratioGap !== 0) return ratioGap;

        const nearTie = Math.abs(a.adjustedScore - b.adjustedScore) <= 2;
        if (nearTie) {
            const affinityGap = normalizedAffinities[b.id] - normalizedAffinities[a.id];
            if (affinityGap !== 0) return affinityGap;
        }

        if (b.adjustedScore !== a.adjustedScore) return b.adjustedScore - a.adjustedScore;
        if (b.rawScore !== a.rawScore) return b.rawScore - a.rawScore;
        return a.id.localeCompare(b.id);
    });

    return {
        answers: userAnswers,
        profileScores,
        archetype,
        explanationSignals,
        teaScores,
        topTea: teaScores[0],
        secondTea: teaScores[1],
    };
};
