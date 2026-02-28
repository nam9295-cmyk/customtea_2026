import { calculateRecommendation } from './calculator';
import { getAnswerLabels, teaRecommendationContent } from '../data/recommendationContent';

const axisOrder = ['mood', 'aroma', 'timing', 'situation', 'temperature', 'caffeine', 'style', 'intensity', 'finish'] as const;

const signalLabelMap = {
    refreshing: '리프레시 성향',
    classic: '클래식 선호',
    adventurous: '탐색 성향',
    dessertLike: '디저트감 선호',
    balanced: '균형감 선호',
    softExotic: '소프트 이국성 선호',
    fruity: '프루티 선호',
    minty: '민티 선호',
    blackTeaForward: '홍차 중심 선호',
    icedFriendly: '아이스 친화 성향',
    afterMeal: '식후 적합 성향',
    calmFocus: '차분한 집중 성향',
} as const;

const bannedClaimRegex = /(치료|완화|개선|예방|효능|효과|해독|디톡스|항염|항균|혈당|혈압|체지방|detox|cure|treat|relief|recovery)/i;

const sampleCases = [
    {
        id: 'classic_focus_case',
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
        id: 'balanced_daily_case',
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
        id: 'fruity_refresh_case',
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
        id: 'cool_dessert_case',
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
        id: 'soft_exotic_case',
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
        id: 'after_meal_refresh_case',
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
];

const rows = sampleCases.map(({ id, answers }) => {
    const recommendation = calculateRecommendation(answers);
    const labels = getAnswerLabels(answers);
    const primaryContent = teaRecommendationContent[recommendation.topTea.id];

    const axisReasons = axisOrder
        .filter((axis) => labels[axis]?.length)
        .slice(0, 2)
        .map((axis) => primaryContent.axisReasons[axis])
        .filter((text): text is string => Boolean(text));

    const topSignal = recommendation.explanationSignals[0];
    const signalReason = topSignal
        ? `${signalLabelMap[topSignal.key]} 신호가 높게 나타나 ${primaryContent.title} 방향성과 안정적으로 맞아떨어졌습니다.`
        : '';

    const visibleCopy = [
        primaryContent.coreDescription,
        ...axisReasons,
        signalReason,
        `취향 타입: ${recommendation.archetype.nameKo} · ${recommendation.archetype.oneLiner}`,
    ].join(' ');

    return {
        id,
        topTea: recommendation.topTea.id,
        secondTea: recommendation.secondTea.id,
        archetype: recommendation.archetype.id,
        hasDeterministicHealthClaim: bannedClaimRegex.test(visibleCopy),
        sample: visibleCopy.slice(0, 220),
    };
});

console.log(JSON.stringify(rows, null, 2));
