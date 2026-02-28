export type QuestionType = 'single' | 'multiple';
export type TeaId = 'britishBlack' | 'asianGold' | 'hibiscusFruit' | 'mintyChocolat';
export type QuestionAxis =
    | 'mood'
    | 'aroma'
    | 'timing'
    | 'situation'
    | 'temperature'
    | 'caffeine'
    | 'style'
    | 'intensity'
    | 'finish';

export type ProfileSignalKey =
    | 'classic'
    | 'adventurous'
    | 'balanced'
    | 'bold'
    | 'refreshing'
    | 'dessertLike'
    | 'ritual'
    | 'casual';

const w = (
    britishBlack: number,
    asianGold: number,
    hibiscusFruit: number,
    mintyChocolat: number,
): Record<TeaId, number> => ({
    britishBlack,
    asianGold,
    hibiscusFruit,
    mintyChocolat,
});

export interface QuestionOption {
    label: string;
    value: string;
    weights: Record<TeaId, number>;
    profileSignals: Partial<Record<ProfileSignalKey, number>>;
}

export interface Question {
    id: string;
    axis: QuestionAxis;
    title: string;
    subtitle?: string;
    type: QuestionType;
    options: QuestionOption[];
}

export const questions: Question[] = [
    {
        id: 'mood',
        axis: 'mood',
        title: '지금, 어떤 결의 한 잔이 가장 끌리나요?',
        subtitle: '첫 인상에 가까운 선택 하나를 골라 주세요.',
        type: 'single',
        options: [
            {
                label: '맑게 환기되는 리프레시',
                value: 'clear_refresh',
                weights: w(1, 3, 4, 3),
                profileSignals: { refreshing: 2, casual: 1, adventurous: 1 },
            },
            {
                label: '차분하게 정돈되는 집중',
                value: 'calm_focus',
                weights: w(4, 3, 1, 2),
                profileSignals: { classic: 2, ritual: 1, balanced: 1 },
            },
            {
                label: '부드럽고 안정적인 균형',
                value: 'soft_balance',
                weights: w(3, 4, 2, 1),
                profileSignals: { balanced: 2, classic: 1, ritual: 1 },
            },
            {
                label: '선명하고 개성 있는 포인트',
                value: 'bold_point',
                weights: w(2, 2, 3, 4),
                profileSignals: { bold: 2, adventurous: 1, refreshing: 1 },
            },
        ]
    },
    {
        id: 'aroma',
        axis: 'aroma',
        title: '선호하는 향 계열을 골라 주세요.',
        subtitle: '최대 2개까지 선택할 수 있어요.',
        type: 'multiple',
        options: [
            {
                label: '홍차 기반의 단단한 향',
                value: 'black_tea_structure',
                weights: w(5, 1, 0, 3),
                profileSignals: { classic: 2, ritual: 1, bold: 1 },
            },
            {
                label: '부드러운 허브·시트러스',
                value: 'herbal_citrus',
                weights: w(1, 5, 3, 1),
                profileSignals: { balanced: 2, casual: 1, adventurous: 1 },
            },
            {
                label: '선명한 과일감과 산뜻함',
                value: 'fruity_bright',
                weights: w(1, 3, 5, 1),
                profileSignals: { refreshing: 2, adventurous: 1, casual: 1 },
            },
            {
                label: '민트의 시원한 존재감',
                value: 'mint_forward',
                weights: w(0, 1, 1, 5),
                profileSignals: { refreshing: 2, bold: 1, adventurous: 1 },
            },
            {
                label: '카카오의 깊고 부드러운 여운',
                value: 'cacao_depth',
                weights: w(4, 2, 1, 5),
                profileSignals: { dessertLike: 2, classic: 1, ritual: 1 },
            },
            {
                label: '플로럴한 가벼운 뉘앙스',
                value: 'light_floral',
                weights: w(1, 3, 4, 2),
                profileSignals: { balanced: 1, casual: 1, adventurous: 1 },
            },
        ]
    },
    {
        id: 'timing',
        axis: 'timing',
        title: '주로 언제 이 티를 찾게 되나요?',
        type: 'single',
        options: [
            {
                label: '아침 시작 직후',
                value: 'morning_start',
                weights: w(4, 2, 1, 2),
                profileSignals: { classic: 1, ritual: 2, bold: 1 },
            },
            {
                label: '늦은 오전~오후 업무 중',
                value: 'day_focus',
                weights: w(2, 4, 3, 2),
                profileSignals: { balanced: 2, ritual: 1, casual: 1 },
            },
            {
                label: '식후 전환 타이밍',
                value: 'after_meal',
                weights: w(1, 2, 2, 5),
                profileSignals: { refreshing: 1, dessertLike: 1, casual: 2 },
            },
            {
                label: '이른 저녁, 하루 정리할 때',
                value: 'early_evening',
                weights: w(3, 4, 2, 3),
                profileSignals: { balanced: 2, ritual: 1, classic: 1 },
            },
            {
                label: '늦은 밤, 가볍게 마무리',
                value: 'late_night',
                weights: w(1, 3, 5, 0),
                profileSignals: { casual: 1, refreshing: 1, balanced: 1 },
            },
        ]
    },
    {
        id: 'situation',
        axis: 'situation',
        title: '어떤 상황에서 가장 잘 어울리길 바라나요?',
        type: 'single',
        options: [
            {
                label: '일에 몰입하는 개인 루틴',
                value: 'deep_work',
                weights: w(4, 3, 1, 2),
                profileSignals: { ritual: 2, classic: 1, bold: 1 },
            },
            {
                label: '짧은 리셋이 필요한 휴식 순간',
                value: 'short_reset',
                weights: w(1, 3, 4, 4),
                profileSignals: { casual: 2, refreshing: 2 },
            },
            {
                label: '식사 후 깔끔한 마무리',
                value: 'after_meal_clean',
                weights: w(1, 2, 3, 5),
                profileSignals: { casual: 2, refreshing: 1, dessertLike: 1 },
            },
            {
                label: '여유 있게 즐기는 티 타임',
                value: 'slow_ritual',
                weights: w(4, 4, 2, 2),
                profileSignals: { ritual: 2, balanced: 1, classic: 1 },
            },
        ]
    },
    {
        id: 'caffeine',
        axis: 'caffeine',
        title: '카페인 선호는 어느 쪽에 가깝나요?',
        type: 'single',
        options: [
            {
                label: '선명한 각성감이 있어도 좋아요',
                value: 'high_ok',
                weights: w(5, 2, 0, 4),
                profileSignals: { bold: 2, classic: 1 },
            },
            {
                label: '중간 정도면 가장 편해요',
                value: 'moderate_ok',
                weights: w(3, 4, 2, 3),
                profileSignals: { balanced: 2, ritual: 1 },
            },
            {
                label: '낮은 편이 좋아요',
                value: 'low_prefer',
                weights: w(1, 4, 5, 1),
                profileSignals: { casual: 1, balanced: 1, refreshing: 1 },
            },
            {
                label: '가능하면 매우 낮았으면 해요',
                value: 'very_low',
                weights: w(0, 3, 5, 0),
                profileSignals: { casual: 1, balanced: 1 },
            },
        ]
    },
    {
        id: 'temperature',
        axis: 'temperature',
        title: '어떤 온도로 마실 때 만족도가 높나요?',
        type: 'single',
        options: [
            {
                label: '따뜻하게 천천히',
                value: 'hot',
                weights: w(5, 4, 1, 2),
                profileSignals: { ritual: 2, classic: 1, balanced: 1 },
            },
            {
                label: '차갑고 선명하게',
                value: 'iced',
                weights: w(1, 2, 5, 4),
                profileSignals: { refreshing: 2, casual: 1, adventurous: 1 },
            },
            {
                label: '상황에 맞게 둘 다',
                value: 'both',
                weights: w(3, 4, 3, 3),
                profileSignals: { balanced: 2, casual: 1, ritual: 1 },
            },
        ]
    },
    {
        id: 'style',
        axis: 'style',
        title: '취향 스펙트럼은 어느 쪽인가요?',
        subtitle: '익숙한 스타일과 새로운 스타일 사이에서 골라 주세요.',
        type: 'single',
        options: [
            {
                label: '익숙하고 클래식한 스타일',
                value: 'familiar_classic',
                weights: w(5, 3, 1, 2),
                profileSignals: { classic: 2, ritual: 1, balanced: 1 },
            },
            {
                label: '클래식 기반 + 약간의 변주',
                value: 'classic_with_twist',
                weights: w(4, 4, 2, 3),
                profileSignals: { balanced: 2, classic: 1, adventurous: 1 },
            },
            {
                label: '새로운 조합을 시도해보고 싶어요',
                value: 'new_discovery',
                weights: w(2, 4, 4, 4),
                profileSignals: { adventurous: 2, bold: 1, casual: 1 },
            },
            {
                label: '선명하게 기억되는 개성형',
                value: 'signature_character',
                weights: w(2, 2, 3, 5),
                profileSignals: { bold: 2, adventurous: 1, refreshing: 1 },
            },
        ]
    },
    {
        id: 'intensity',
        axis: 'intensity',
        title: '풍미의 인상은 어떤 쪽이 더 좋나요?',
        type: 'single',
        options: [
            {
                label: '부드럽고 유연한 균형',
                value: 'soft_balanced',
                weights: w(3, 5, 3, 1),
                profileSignals: { balanced: 2, classic: 1, ritual: 1 },
            },
            {
                label: '중간 강도로 깔끔한 존재감',
                value: 'middle_clean',
                weights: w(3, 4, 4, 3),
                profileSignals: { balanced: 2, casual: 1, refreshing: 1 },
            },
            {
                label: '또렷하고 강한 개성',
                value: 'strong_character',
                weights: w(4, 2, 2, 5),
                profileSignals: { bold: 2, classic: 1, adventurous: 1 },
            },
            {
                label: '가볍고 산뜻한 질감',
                value: 'light_texture',
                weights: w(1, 3, 5, 3),
                profileSignals: { refreshing: 2, casual: 1, adventurous: 1 },
            },
        ]
    },
    {
        id: 'finish',
        axis: 'finish',
        title: '마지막 여운은 어느 쪽이 더 취향인가요?',
        subtitle: '디저트감과 리프레시감 사이의 선호를 골라 주세요.',
        type: 'single',
        options: [
            {
                label: '깔끔하게 리프레시되는 타입',
                value: 'refresh_finish',
                weights: w(1, 3, 5, 4),
                profileSignals: { refreshing: 2, casual: 1, adventurous: 1 },
            },
            {
                label: '산뜻함과 부드러움이 함께',
                value: 'refresh_soft',
                weights: w(2, 5, 4, 2),
                profileSignals: { balanced: 2, refreshing: 1, casual: 1 },
            },
            {
                label: '디저트 같은 만족감이 있는 타입',
                value: 'dessert_finish',
                weights: w(4, 2, 1, 5),
                profileSignals: { dessertLike: 2, bold: 1, ritual: 1 },
            },
            {
                label: '묵직하지만 단정한 클래식 여운',
                value: 'classic_finish',
                weights: w(5, 3, 1, 3),
                profileSignals: { classic: 2, ritual: 1, balanced: 1 },
            },
        ]
    },
];
