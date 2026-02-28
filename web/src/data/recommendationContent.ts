import { questions, QuestionAxis, TeaId } from './questions';

export interface TeaRecommendationContent {
    title: string;
    subtitle: string;
    coreDescription: string;
    flavorKeywords: string[];
    timings: string[];
    situations: string[];
    axisReasons: Partial<Record<QuestionAxis, string>>;
}

export const teaRecommendationContent: Record<TeaId, TeaRecommendationContent> = {
    britishBlack: {
        title: '브리티쉬 블랙',
        subtitle: '클래식한 깊이감',
        coreDescription: '홍차의 단단한 구조감과 카카오 결이 차분하게 이어지는, 클래식한 무드의 블렌드입니다.',
        flavorKeywords: ['깊은 홍차감', '카카오 결', '묵직한 여운', '클래식 무드'],
        timings: ['아침 시작', '오전 업무 시간', '이른 저녁'],
        situations: ['집중 루틴', '차분한 독서 시간', '단정한 티 타임'],
        axisReasons: {
            mood: '차분하고 정돈된 무드를 선호하는 선택이 브리티쉬 블랙의 결에 잘 맞았습니다.',
            aroma: '홍차 구조감과 카카오 깊이감에 대한 선호가 또렷하게 반영되었습니다.',
            timing: '아침과 업무 시간대에 어울리는 단정한 밸런스를 우선했습니다.',
            situation: '개인 루틴에 안정적으로 어울리는 분위기를 고려했습니다.',
            caffeine: '카페인 허용 범위 선택이 홍차 기반 블렌드와 자연스럽게 연결되었습니다.',
            temperature: '따뜻하게 즐길 때 풍미의 층이 안정적으로 드러나는 점을 반영했습니다.',
            style: '클래식한 스타일 선호가 브리티쉬 블랙과 잘 맞았습니다.',
            intensity: '또렷한 존재감과 구조적인 인상을 선호한 선택이 반영되었습니다.',
            finish: '단정하고 깊은 여운을 선호한 점이 최종 추천에 기여했습니다.',
        },
    },
    asianGold: {
        title: '아시안 골드',
        subtitle: '부드러운 이국적 균형감',
        coreDescription: '우롱차의 구조감, 루이보스의 부드러움, 레몬그라스의 산뜻함이 균형 있게 이어지는 블렌드입니다.',
        flavorKeywords: ['부드러운 이국성', '허브-시트러스', '정돈된 바디감', '깔끔한 마무리'],
        timings: ['늦은 오전', '오후', '이른 저녁'],
        situations: ['데일리 티 루틴', '식후 리셋', '무겁지 않은 집중 시간'],
        axisReasons: {
            mood: '균형감 있고 과하지 않은 무드 선호가 아시안 골드와 잘 맞았습니다.',
            aroma: '허브-시트러스 계열과 부드러운 풍미 선택이 핵심 매칭 포인트였습니다.',
            timing: '늦은 오전부터 이른 저녁까지 자연스럽게 이어지는 사용성을 반영했습니다.',
            situation: '데일리 루틴에서 부담 없이 이어지는 사용감을 반영했습니다.',
            caffeine: '낮거나 중간 카페인 성향에 맞춰 부담을 줄인 균형형 추천으로 정리했습니다.',
            temperature: '핫과 아이스 모두 무리 없이 즐길 수 있는 유연함을 고려했습니다.',
            style: '익숙함과 새로움의 균형을 원하는 취향이 반영되었습니다.',
            intensity: '강하기보다 정돈된 중간 강도의 풍미 선호를 반영했습니다.',
            finish: '산뜻하지만 부드러운 여운을 원하는 선택과 잘 맞았습니다.',
        },
    },
    hibiscusFruit: {
        title: '히비스커스 프룻',
        subtitle: '밝고 경쾌한 프루티 무드',
        coreDescription: '밝은 과일감과 산뜻한 산미가 중심이 되는, 경쾌한 리프레시 타입의 블렌드입니다.',
        flavorKeywords: ['선명한 과일감', '산뜻한 산미', '가벼운 바디', '클린 피니시'],
        timings: ['늦은 오전', '오후', '늦은 밤'],
        situations: ['기분 환기', '아이스 티 타임', '가벼운 식후 한 잔'],
        axisReasons: {
            mood: '맑게 환기되는 무드를 원하는 선택이 히비스커스 프룻과 강하게 맞물렸습니다.',
            aroma: '과일감과 산뜻함을 우선한 취향이 가장 큰 근거로 반영되었습니다.',
            timing: '오후와 늦은 밤까지 가볍게 이어지는 타이밍 선호를 반영했습니다.',
            situation: '짧은 리셋이나 기분 환기 상황에 맞는 선택이 반영되었습니다.',
            caffeine: '낮은 카페인 쪽 선택이 프루티 중심 프로필과 자연스럽게 연결되었습니다.',
            temperature: '차갑게 마셨을 때의 선명한 인상을 선호한 점이 매칭을 강화했습니다.',
            style: '새로운 조합을 시도하려는 취향이 히비스커스 프룻과 잘 맞았습니다.',
            intensity: '가볍고 산뜻한 질감을 선호한 선택이 반영되었습니다.',
            finish: '리프레시되는 마무리 선호가 핵심 기준으로 작동했습니다.',
        },
    },
    mintyChocolat: {
        title: '민티 쇼콜라',
        subtitle: '상쾌함과 만족감의 세련된 대비',
        coreDescription: '민트의 상쾌함과 카카오의 부드러운 여운이 함께 오는, 식후에도 잘 어울리는 블렌드입니다.',
        flavorKeywords: ['민트 리프레시', '카카오 여운', '선명한 대비', '깔끔한 마무리'],
        timings: ['식후', '오후', '이른 저녁'],
        situations: ['식후 전환', '디저트 무드 대체', '무거운 기분 환기'],
        axisReasons: {
            mood: '상쾌함과 만족감을 함께 원한 무드 선택이 민티 쇼콜라와 맞닿았습니다.',
            aroma: '민트와 카카오를 함께 선호한 조합이 결정적인 매칭 근거였습니다.',
            timing: '식후와 오후 중심의 리듬에 자연스럽게 어울리도록 반영했습니다.',
            situation: '식후 전환과 기분 환기 상황에서의 적합성을 반영했습니다.',
            caffeine: '중간 수준 카페인 성향에서 안정적으로 즐기기 좋은 선택으로 정리했습니다.',
            temperature: '따뜻하게 또는 차갑게 모두 세련된 대비를 느끼기 좋은 프로필입니다.',
            style: '개성 있는 스타일을 찾는 취향과 민티 쇼콜라의 성격이 일치했습니다.',
            intensity: '또렷한 개성과 선명한 대비를 원하는 선택이 반영되었습니다.',
            finish: '디저트감 있는 만족과 깔끔한 마무리를 함께 원하는 취향이 반영되었습니다.',
        },
    },
};

const optionLabelLookup = questions.reduce<Record<string, Record<string, string>>>((acc, question) => {
    acc[question.id] = question.options.reduce<Record<string, string>>((optionAcc, option) => {
        optionAcc[option.value] = option.label;
        return optionAcc;
    }, {});
    return acc;
}, {});

export const getAnswerLabels = (answers: Record<string, string | string[]>) => {
    return questions.reduce<Record<string, string[]>>((acc, question) => {
        const value = answers[question.id];
        if (!value) {
            acc[question.id] = [];
            return acc;
        }

        const values = Array.isArray(value) ? value : [value];
        acc[question.id] = values
            .map((selected) => optionLabelLookup[question.id]?.[selected])
            .filter((label): label is string => Boolean(label));
        return acc;
    }, {});
};
