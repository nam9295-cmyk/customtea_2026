export type QuestionType = 'single' | 'multiple';

export interface QuestionOption {
    label: string;
    value: string;
    weights: Record<string, number>;
}

export interface Question {
    id: string;
    title: string;
    subtitle?: string;
    type: QuestionType;
    options: QuestionOption[];
}

export const questions: Question[] = [
    {
        id: 'time',
        title: '차를 찾는 가장 큰 목적이 무엇인가요?',
        subtitle: '주로 마시는 시간대를 생각해보세요.',
        type: 'single',
        options: [
            { label: '활기찬 아침', value: 'morning', weights: { refresh: 2, caffeine: 2 } },
            { label: '나른한 오후', value: 'afternoon', weights: { dessert: 1, refresh: 1 } },
            { label: '차분한 저녁', value: 'evening', weights: { cozy: 2, nightFriendly: 1 } },
            { label: '잠들기 전 밤', value: 'night', weights: { nightFriendly: 3, caffeine: -4 } }
        ]
    },
    {
        id: 'caffeine',
        title: '카페인에 얼마나 민감하신가요?',
        type: 'single',
        options: [
            { label: '전혀 상관없어요', value: 'high', weights: { caffeine: 2 } },
            { label: '보통이에요', value: 'medium', weights: { caffeine: 0 } },
            { label: '조금 피하고 싶어요', value: 'low', weights: { caffeine: -2 } },
            { label: '거의 없었으면 좋겠어요', value: 'none', weights: { caffeine: -5, nightFriendly: 2 } }
        ]
    },
    {
        id: 'mood',
        title: '지금 어떤 느낌을 원하시나요?',
        subtitle: '복수 선택이 가능해요.',
        type: 'multiple',
        options: [
            { label: '상쾌함', value: 'refresh', weights: { refresh: 3, citrus: 1 } },
            { label: '몰입과 집중', value: 'focus', weights: { blackTea: 2, caffeine: 1 } },
            { label: '깊은 휴식과 편안함', value: 'cozy', weights: { cozy: 3, floral: 1 } },
            { label: '디저트 같은 만족감', value: 'dessert', weights: { dessert: 3, chocolatey: 1 } }
        ]
    },
    {
        id: 'flavor',
        title: '어떤 맛과 향을 선호하시나요?',
        subtitle: '복수 선택이 가능해요.',
        type: 'multiple',
        options: [
            { label: '상큼한 과일향', value: 'fruity', weights: { fruity: 3, citrus: 2 } },
            { label: '시원한 민트향', value: 'minty', weights: { minty: 4, refresh: 1 } },
            { label: '진한 홍차 풍미', value: 'blackTea', weights: { blackTea: 4 } },
            { label: '달콤한 카카오/초콜릿', value: 'chocolatey', weights: { chocolatey: 3, dessert: 1 } },
            { label: '고소한 너티(Nutty)', value: 'nutty', weights: { nutty: 3 } },
            { label: '향긋한 플로럴', value: 'floral', weights: { floral: 3 } }
        ]
    },
    {
        id: 'intensity',
        title: '향의 강도는 어느 정도가 좋으신가요?',
        type: 'single',
        options: [
            { label: '은은하게', value: 'mild', weights: { cozy: 1 } },
            { label: '적당하게 (중간)', value: 'medium', weights: {} },
            { label: '아주 진하게', value: 'strong', weights: { blackTea: 1, minty: 1, fruity: 1 } }
        ]
    },
    {
        id: 'temperature',
        title: '주로 어떤 온도로 즐기시나요?',
        type: 'single',
        options: [
            { label: '따뜻하게 (Hot)', value: 'hot', weights: { cozy: 2 } },
            { label: '시원하게 (Iced)', value: 'iced', weights: { refresh: 2, fruity: 1 } },
            { label: '둘 다 좋아요', value: 'both', weights: {} }
        ]
    }
];
