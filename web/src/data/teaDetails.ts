export interface RadarData {
    subject: string;
    A: number;
    fullMark: number;
}

export interface Feature {
    src: string;
    label: string;
}

export interface TeaDetail {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    radarData: RadarData[];
    features: Feature[];
    imageDefault: string;
    imageHover: string;
    popImage: string;
    chartColor: string;
}

export const teaDetails: TeaDetail[] = [
    {
        id: 'britishBlack',
        name: 'British Black',
        subtitle: 'with Classic Assam & Ceylon',
        description: 'A structured black-tea profile with a calm, warm finish. Well-suited to focused mornings and classic tea rituals.',
        imageDefault: '/images/british_cup.webp',
        imageHover: '/images/british.webp',
        popImage: '/images/british-black/british_pop.webp',
        chartColor: '#806D6E',
        radarData: [
            { subject: '구조감(Structure)', A: 92, fullMark: 100 },
            { subject: '리프레시(Refresh)', A: 35, fullMark: 100 },
            { subject: '풍미 레이어(Complexity)', A: 78, fullMark: 100 },
            { subject: '데일리 적합성(Daily Fit)', A: 70, fullMark: 100 },
            { subject: '무드 전환(Mood Shift)', A: 45, fullMark: 100 },
        ],
        features: [
            { src: '/images/british-black/structure_b.svg', label: 'Classic\nDepth' },
            { src: '/images/british-black/dust_b.svg', label: 'Structured\nBody' },
            { src: '/images/british-black/finish_b.svg', label: 'Warm\nFinish' },
            { src: '/images/british-black/ritual_b.svg', label: 'Focus\nRitual' },
        ]
    },
    {
        id: 'asianGold',
        name: 'Asian Gold',
        subtitle: 'with Oolong, Rooibos & Lemongrass',
        description: 'Soft exotic notes and herbal-citrus brightness move in balance, making it an easy daily option from late morning to early evening.',
        imageDefault: '/images/asian_cup.webp',
        imageHover: '/images/asian.webp',
        popImage: '/images/asian-gold/asian_pop.webp',
        chartColor: '#bca591',
        radarData: [
            { subject: '구조감(Structure)', A: 64, fullMark: 100 },
            { subject: '리프레시(Refresh)', A: 68, fullMark: 100 },
            { subject: '풍미 레이어(Complexity)', A: 82, fullMark: 100 },
            { subject: '데일리 적합성(Daily Fit)', A: 90, fullMark: 100 },
            { subject: '무드 전환(Mood Shift)', A: 72, fullMark: 100 },
        ],
        features: [
            { src: '/images/asian-gold/notes_a.svg', label: 'Soft Exotic\nNotes' },
            { src: '/images/asian-gold/layers_a.svg', label: 'Balanced\nLayers' },
            { src: '/images/asian-gold/citrus_a.svg', label: 'Herbal Citrus\nFinish' },
            { src: '/images/asian-gold/versatile_a.svg', label: 'Daily\nVersatility' },
        ]
    },
    {
        id: 'hibiscusFruit',
        name: 'Hibiscus Fruit',
        subtitle: 'with Mungyeong Omija',
        description: 'A bright fruity profile with a crisp finish. Especially fitting for iced servings, afternoon resets, and light after-meal moments.',
        imageDefault: '/images/hibis_cup.webp',
        imageHover: '/images/hibis.webp',
        popImage: '/images/hibiscus-fruit/hibis_pop.webp',
        chartColor: '#c09696',
        radarData: [
            { subject: '구조감(Structure)', A: 38, fullMark: 100 },
            { subject: '리프레시(Refresh)', A: 95, fullMark: 100 },
            { subject: '풍미 레이어(Complexity)', A: 66, fullMark: 100 },
            { subject: '데일리 적합성(Daily Fit)', A: 75, fullMark: 100 },
            { subject: '무드 전환(Mood Shift)', A: 88, fullMark: 100 },
        ],
        features: [
            { src: '/images/hibiscus-fruit/bright_h.svg', label: 'Bright Fruit\nNotes' },
            { src: '/images/hibiscus-fruit/crisp_h.svg', label: 'Crisp\nAcidity' },
            { src: '/images/hibiscus-fruit/iced_h.svg', label: 'Iced\nFriendly' },
            { src: '/images/hibiscus-fruit/reset_h.svg', label: 'Light Reset\nMood' },
        ]
    },
    {
        id: 'mintyChocolat',
        name: 'Minty Chocolat',
        subtitle: 'with Black Tea, Mint & Cacao',
        description: 'Minty lift and cacao depth arrive together, giving a polished contrast that pairs naturally with after-meal or late-afternoon moods.',
        imageDefault: '/images/minty_cup.webp',
        imageHover: '/images/minty.webp',
        popImage: '/images/minty-chocolat/minty_pop.webp',
        chartColor: '#7099a6',
        radarData: [
            { subject: '구조감(Structure)', A: 74, fullMark: 100 },
            { subject: '리프레시(Refresh)', A: 88, fullMark: 100 },
            { subject: '풍미 레이어(Complexity)', A: 80, fullMark: 100 },
            { subject: '데일리 적합성(Daily Fit)', A: 68, fullMark: 100 },
            { subject: '무드 전환(Mood Shift)', A: 84, fullMark: 100 },
        ],
        features: [
            { src: '/images/minty-chocolat/mint_m.svg', label: 'Cool Mint\nLift' },
            { src: '/images/minty-chocolat/cacao_m.svg', label: 'Cacao\nAftertaste' },
            { src: '/images/minty-chocolat/aftermeal_m.svg', label: 'After-meal\nMatch' },
            { src: '/images/minty-chocolat/contrast_m.svg', label: 'Fresh\nContrast' },
        ]
    }
];
