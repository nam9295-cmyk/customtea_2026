import { calculateRecommendation } from './calculator';
import { questions } from '../data/questions';

type AnswerMap = Record<string, string | string[]>;

interface SyntheticCase {
    id: string;
    answers: AnswerMap;
}

const syntheticCases: SyntheticCase[] = [
    {
        id: 'classic_morning_focus',
        answers: {
            mood: 'calm_focus',
            aroma: ['black_tea_structure', 'cacao_depth'],
            timing: 'morning_start',
            situation: 'deep_work',
            caffeine: 'high_ok',
            temperature: 'hot',
            style: 'familiar_classic',
            intensity: 'strong_character',
            finish: 'classic_finish',
        },
    },
    {
        id: 'balanced_daily_office',
        answers: {
            mood: 'soft_balance',
            aroma: ['herbal_citrus', 'light_floral'],
            timing: 'day_focus',
            situation: 'slow_ritual',
            caffeine: 'moderate_ok',
            temperature: 'both',
            style: 'classic_with_twist',
            intensity: 'middle_clean',
            finish: 'refresh_soft',
        },
    },
    {
        id: 'fruity_iced_reset',
        answers: {
            mood: 'clear_refresh',
            aroma: ['fruity_bright', 'light_floral'],
            timing: 'day_focus',
            situation: 'short_reset',
            caffeine: 'low_prefer',
            temperature: 'iced',
            style: 'new_discovery',
            intensity: 'light_texture',
            finish: 'refresh_finish',
        },
    },
    {
        id: 'after_meal_minty_dessert',
        answers: {
            mood: 'bold_point',
            aroma: ['mint_forward', 'cacao_depth'],
            timing: 'after_meal',
            situation: 'after_meal_clean',
            caffeine: 'moderate_ok',
            temperature: 'both',
            style: 'signature_character',
            intensity: 'strong_character',
            finish: 'dessert_finish',
        },
    },
    {
        id: 'late_night_light_fruity',
        answers: {
            mood: 'clear_refresh',
            aroma: ['fruity_bright'],
            timing: 'late_night',
            situation: 'short_reset',
            caffeine: 'very_low',
            temperature: 'iced',
            style: 'new_discovery',
            intensity: 'light_texture',
            finish: 'refresh_finish',
        },
    },
    {
        id: 'evening_soft_exotic',
        answers: {
            mood: 'soft_balance',
            aroma: ['herbal_citrus', 'fruity_bright'],
            timing: 'early_evening',
            situation: 'slow_ritual',
            caffeine: 'moderate_ok',
            temperature: 'hot',
            style: 'classic_with_twist',
            intensity: 'soft_balanced',
            finish: 'refresh_soft',
        },
    },
    {
        id: 'bold_blacktea_signature',
        answers: {
            mood: 'bold_point',
            aroma: ['black_tea_structure'],
            timing: 'morning_start',
            situation: 'deep_work',
            caffeine: 'high_ok',
            temperature: 'hot',
            style: 'signature_character',
            intensity: 'strong_character',
            finish: 'classic_finish',
        },
    },
    {
        id: 'classic_with_refresh_finish',
        answers: {
            mood: 'calm_focus',
            aroma: ['black_tea_structure', 'herbal_citrus'],
            timing: 'day_focus',
            situation: 'deep_work',
            caffeine: 'moderate_ok',
            temperature: 'both',
            style: 'familiar_classic',
            intensity: 'middle_clean',
            finish: 'refresh_finish',
        },
    },
    {
        id: 'minty_iced_workday',
        answers: {
            mood: 'clear_refresh',
            aroma: ['mint_forward'],
            timing: 'day_focus',
            situation: 'short_reset',
            caffeine: 'high_ok',
            temperature: 'iced',
            style: 'classic_with_twist',
            intensity: 'middle_clean',
            finish: 'refresh_finish',
        },
    },
    {
        id: 'dessert_but_low_caffeine',
        answers: {
            mood: 'soft_balance',
            aroma: ['cacao_depth'],
            timing: 'after_meal',
            situation: 'after_meal_clean',
            caffeine: 'low_prefer',
            temperature: 'hot',
            style: 'new_discovery',
            intensity: 'soft_balanced',
            finish: 'dessert_finish',
        },
    },
    {
        id: 'soft_daily_low_caffeine',
        answers: {
            mood: 'soft_balance',
            aroma: ['herbal_citrus'],
            timing: 'day_focus',
            situation: 'slow_ritual',
            caffeine: 'very_low',
            temperature: 'both',
            style: 'familiar_classic',
            intensity: 'soft_balanced',
            finish: 'refresh_soft',
        },
    },
    {
        id: 'fruity_aftermeal_cold',
        answers: {
            mood: 'clear_refresh',
            aroma: ['fruity_bright', 'mint_forward'],
            timing: 'after_meal',
            situation: 'after_meal_clean',
            caffeine: 'low_prefer',
            temperature: 'iced',
            style: 'new_discovery',
            intensity: 'light_texture',
            finish: 'refresh_finish',
        },
    },
    {
        id: 'balanced_evening_hot',
        answers: {
            mood: 'calm_focus',
            aroma: ['herbal_citrus', 'black_tea_structure'],
            timing: 'early_evening',
            situation: 'slow_ritual',
            caffeine: 'moderate_ok',
            temperature: 'hot',
            style: 'classic_with_twist',
            intensity: 'middle_clean',
            finish: 'classic_finish',
        },
    },
    {
        id: 'signature_minty_dessert_evening',
        answers: {
            mood: 'bold_point',
            aroma: ['mint_forward', 'cacao_depth'],
            timing: 'early_evening',
            situation: 'after_meal_clean',
            caffeine: 'high_ok',
            temperature: 'both',
            style: 'signature_character',
            intensity: 'strong_character',
            finish: 'dessert_finish',
        },
    },
    {
        id: 'late_night_balanced_reset',
        answers: {
            mood: 'soft_balance',
            aroma: ['light_floral', 'herbal_citrus'],
            timing: 'late_night',
            situation: 'short_reset',
            caffeine: 'very_low',
            temperature: 'both',
            style: 'classic_with_twist',
            intensity: 'soft_balanced',
            finish: 'refresh_soft',
        },
    },
    {
        id: 'classic_hot_vs_explore_finish',
        answers: {
            mood: 'calm_focus',
            aroma: ['black_tea_structure', 'light_floral'],
            timing: 'morning_start',
            situation: 'deep_work',
            caffeine: 'high_ok',
            temperature: 'hot',
            style: 'classic_with_twist',
            intensity: 'middle_clean',
            finish: 'refresh_soft',
        },
    },
    {
        id: 'soft_exotic_probe_a',
        answers: {
            mood: 'soft_balance',
            aroma: ['herbal_citrus', 'light_floral'],
            timing: 'day_focus',
            situation: 'short_reset',
            caffeine: 'low_prefer',
            temperature: 'both',
            style: 'new_discovery',
            intensity: 'light_texture',
            finish: 'refresh_soft',
        },
    },
    {
        id: 'soft_exotic_probe_b',
        answers: {
            mood: 'soft_balance',
            aroma: ['herbal_citrus', 'light_floral'],
            timing: 'early_evening',
            situation: 'short_reset',
            caffeine: 'moderate_ok',
            temperature: 'both',
            style: 'new_discovery',
            intensity: 'middle_clean',
            finish: 'refresh_soft',
        },
    },
    {
        id: 'soft_exotic_probe_c',
        answers: {
            mood: 'soft_balance',
            aroma: ['herbal_citrus', 'fruity_bright'],
            timing: 'day_focus',
            situation: 'short_reset',
            caffeine: 'low_prefer',
            temperature: 'both',
            style: 'new_discovery',
            intensity: 'light_texture',
            finish: 'refresh_soft',
        },
    },
    {
        id: 'balanced_classic_probe',
        answers: {
            mood: 'calm_focus',
            aroma: ['herbal_citrus', 'black_tea_structure'],
            timing: 'early_evening',
            situation: 'slow_ritual',
            caffeine: 'moderate_ok',
            temperature: 'both',
            style: 'classic_with_twist',
            intensity: 'soft_balanced',
            finish: 'refresh_soft',
        },
    },
];

const validatePattern = (answers: AnswerMap) => {
    questions.forEach((question) => {
        const answer = answers[question.id];
        if (answer === undefined) {
            throw new Error(`Missing answer for question '${question.id}'`);
        }

        const allowed = new Set(question.options.map((option) => option.value));
        const values = Array.isArray(answer) ? answer : [answer];

        if (question.type === 'multiple' && values.length === 0) {
            throw new Error(`Question '${question.id}' requires at least one selection`);
        }

        values.forEach((value) => {
            if (!allowed.has(value)) {
                throw new Error(`Invalid answer '${value}' for question '${question.id}'`);
            }
        });
    });
};

const increment = (target: Record<string, number>, key: string) => {
    target[key] = (target[key] || 0) + 1;
};

const runAudit = () => {
    syntheticCases.forEach((item) => validatePattern(item.answers));

    const top1Counts: Record<string, number> = {};
    const top2Counts: Record<string, number> = {};
    const archetypeCounts: Record<string, number> = {};
    const pairCounts: Record<string, number> = {};
    const results = syntheticCases.map((item) => {
        const result = calculateRecommendation(item.answers);
        increment(top1Counts, result.topTea.id);
        increment(top2Counts, result.secondTea.id);
        increment(archetypeCounts, result.archetype.id);
        increment(pairCounts, `${result.topTea.id}->${result.secondTea.id}`);

        return {
            caseId: item.id,
            topTea: result.topTea.id,
            topRatio: result.topTea.ratio,
            secondTea: result.secondTea.id,
            secondRatio: result.secondTea.ratio,
            archetype: result.archetype.id,
            topSignals: result.explanationSignals.slice(0, 2).map((signal) => signal.key),
        };
    });

    const total = syntheticCases.length;
    const top1Rates = Object.fromEntries(
        Object.entries(top1Counts).map(([key, count]) => [key, Number((count / total).toFixed(3))]),
    );
    const maxTop1 = Math.max(...Object.values(top1Counts));
    const minTop1 = Math.min(...['britishBlack', 'asianGold', 'hibiscusFruit', 'mintyChocolat'].map((tea) => top1Counts[tea] || 0));
    const maxTop2 = Math.max(...Object.values(top2Counts));
    const maxPair = Math.max(...Object.values(pairCounts));
    const distinctTop1 = Object.keys(top1Counts).length;
    const distinctTop2 = Object.keys(top2Counts).length;
    const distinctArchetypes = Object.keys(archetypeCounts).length;

    const hardFailReasons: string[] = [];
    if (maxTop1 > total * 0.5) {
        hardFailReasons.push('Top1 distribution collapse: one tea exceeds 50%');
    }
    if (minTop1 === 0) {
        hardFailReasons.push('Top1 starvation: one tea never appears as top1');
    }
    if (maxTop2 > total * 0.5) {
        hardFailReasons.push('Top2 fallback collapse: one tea exceeds 50% in second recommendation');
    }
    if (maxPair > total * 0.33) {
        hardFailReasons.push('Pair lock-in: same top1->top2 pair exceeds 33%');
    }
    if (distinctTop1 < 3) {
        hardFailReasons.push('Personalization gap: fewer than 3 teas appear as top1');
    }
    if (distinctTop2 < 3) {
        hardFailReasons.push('Second recommendation diversity too low: fewer than 3 teas appear as top2');
    }
    if (distinctArchetypes < 4) {
        hardFailReasons.push('Archetype diversity too low: fewer than 4 archetypes appear');
    }

    const summary = {
        totalCases: total,
        top1Counts,
        top1Rates,
        top2Counts,
        archetypeCounts,
        pairCounts,
        hardFail: hardFailReasons.length > 0,
        hardFailReasons,
    };

    return {
        summary,
        results,
    };
};

const audit = runAudit();
console.log(JSON.stringify(audit, null, 2));
