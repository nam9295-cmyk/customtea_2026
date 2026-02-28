// Navigation Data
export const navLinks = ['서비스 소개', '티 종류', '브랜드 철학'];

// Process Data
export const processSteps = [
    {
        num: '01.',
        title: '취향 데이터 입력',
        desc: '선호하는 향과 맛, 시간대와 카페인 성향을 가볍게 체크합니다.',
    },
    {
        num: '02.',
        title: '블렌드 분석 및 설계',
        desc: '알고리즘이 4가지 베이스 티를 분석하여 최적의 비율을 도출합니다.',
    },
    {
        num: '03.',
        title: '맞춤형 패키지 완성',
        desc: '분석 리포트와 함께 당신만을 위한 블렌드 티가 준비됩니다.',
    },
];

// Tea Base Data
export const teaBases = [
    {
        label: 'BLACK',
        title: 'British Black',
        desc: '깊고 풍부한 바디감의 클래식 홍차',
        color: '#D4644E',
        bg: '#F4F1EE',
    },
    {
        label: 'GOLD',
        title: 'Asian Gold',
        desc: '우아하고 부드러운 우롱의 향기',
        color: '#E8C4B8',
        bg: '#F8F6F4',
    },
    {
        label: 'RED',
        title: 'Hibiscus Fruit',
        desc: '밝고 산뜻하게 이어지는 프루티 산미',
        color: '#D97762',
        bg: '#FFF5ED',
    },
    {
        label: 'GREEN',
        title: 'Minty Choco',
        desc: '청량한 민트와 달콤한 카카오',
        color: '#7D9D9C',
        bg: '#F2F7F5',
    },
];

// Sample Result Data (Hero Panel & Sample Section)
export const heroReport = {
    id: 'NO. 2024-001',
    title: 'Evening\nTranquility',
    tags: ['#Evening', '#Reset', '#Low-Caffeine'],
    ratios: [
        { name: 'Hibiscus Base', val: '65', displayVal: '65%', color: 'bg-accent', delay: '0s' },
        { name: 'Minty Chocolate', val: '35', displayVal: '35%', color: 'bg-text-primary', delay: '0.2s' },
    ],
};

export const sampleResult = {
    blendNo: 'CUSTOM BLEND NO. 01',
    title: '오후 무드를 환기하는\n시트러스 블렌드',
    ratios: [
        { name: 'British Black (Classic)', val: '55%' },
        { name: 'Hibiscus Fruit (Refresh)', val: '45%' },
    ],
};

// Survey Questions
export const questions = [
    {
        id: 'purpose',
        text: '차를 찾는 가장 큰 목적이 무엇인가요?',
        options: [
            { id: 'relax', title: '깊은 휴식과 수면', description: '스트레스를 풀고 편안하게 잠들고 싶어요.' },
            { id: 'energy', title: '에너지와 활력', description: '나른한 오후, 기분 좋은 활력이 필요해요.' },
            { id: 'refresh', title: '가벼운 리프레시', description: '식사 후나 오후에 분위기를 산뜻하게 전환하고 싶어요.' },
            { id: 'focus', title: '몰입과 집중', description: '중요한 일을 앞두고 맑은 정신이 필요해요.' }
        ]
    },
    {
        id: 'caffeine',
        text: '카페인에 얼마나 민감하신가요?',
        options: [
            { id: 'high', title: '전혀 상관없어요', description: '커피도 즐겨 마시고, 카페인에 큰 영향을 받지 않아요.' },
            { id: 'medium', title: '보통이에요', description: '오전에 한두 잔 정도는 괜찮아요.' },
            { id: 'low', title: '조금 피하고 싶어요', description: '저녁에는 마시지 않는 편이에요.' },
            { id: 'none', title: '거의 없었으면 좋겠어요', description: '카페인에 예민해서 디카페인/무카페인을 선호해요.' }
        ]
    }
];
