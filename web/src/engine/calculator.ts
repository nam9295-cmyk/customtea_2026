import { questions, Question } from '../data/questions';
import { teaProfiles } from '../data/teaProfiles';

export interface BlendResult {
    id: string;
    name: string;
    ratio: number;
    rawScore: number;
}

export const calculateBlendRatio = (userAnswers: Record<string, string | string[]>): BlendResult[] => {
    // 1. Calculate total user weights
    const totalUserWeights: Record<string, number> = {};

    questions.forEach((question: Question) => {
        const answer = userAnswers[question.id];
        if (!answer) return;

        // Ensure array for uniform processing
        const selectedValues = Array.isArray(answer) ? answer : [answer];

        selectedValues.forEach(value => {
            const option = question.options.find(opt => opt.value === value);
            if (option && option.weights) {
                Object.entries(option.weights).forEach(([key, weight]) => {
                    totalUserWeights[key] = (totalUserWeights[key] || 0) + weight;
                });
            }
        });
    });

    // 2. Score each tea profile
    let totalScore = 0;
    const rawScores = Object.values(teaProfiles).map(tea => {
        let matchScore = 0;

        // Multiply tea scores by user preferred weights
        Object.entries(tea.scores).forEach(([attribute, teaAttributeScore]) => {
            const userWeight = totalUserWeights[attribute] || 0;
            matchScore += teaAttributeScore * userWeight;
        });

        // Ensure no negative scores
        matchScore = Math.max(0, matchScore);
        totalScore += matchScore;

        return {
            id: tea.id,
            name: tea.name,
            rawScore: matchScore,
        };
    });

    // 3. Convert to percentages and sort
    const results: BlendResult[] = rawScores.map(tea => {
        const ratio = totalScore > 0 ? Math.round((tea.rawScore / totalScore) * 100) : 0;
        return {
            ...tea,
            ratio
        };
    });

    // Handle rounding errors to ensure it adds up exactly to 100%
    const totalRatio = results.reduce((sum, item) => sum + item.ratio, 0);
    if (totalRatio > 0 && totalRatio !== 100) {
        // Find highest ratio and adjust
        results.sort((a, b) => b.ratio - a.ratio);
        results[0].ratio += (100 - totalRatio);
    }

    // Sort by ratio descending
    return results.sort((a, b) => b.ratio - a.ratio);
};
