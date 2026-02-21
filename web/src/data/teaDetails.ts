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
        description: 'The pleasant bitterness of balloon flower root (doraji) meets the deep richness of black tea, creating a warm and comforting cup.',
        imageDefault: '/images/british_cup.webp',
        imageHover: '/images/british.webp',
        popImage: '/images/british-black/british_pop.webp',
        chartColor: '#806D6E',
        radarData: [
            { subject: '호흡기(Respiratory)', A: 95, fullMark: 100 },
            { subject: '면역(Immunity)', A: 55, fullMark: 100 },
            { subject: '소화/해독(Digestion)', A: 40, fullMark: 100 },
            { subject: '활력(Energy)', A: 70, fullMark: 100 },
            { subject: '이완(Relaxation)', A: 30, fullMark: 100 },
        ],
        features: [
            { src: '/images/british-black/respiratory_b.svg', label: 'Respiratory\nCare' },
            { src: '/images/british-black/dust_b.svg', label: 'Fine-dust\nDefense' },
            { src: '/images/british-black/immune_b.svg', label: 'Immune Foundation\nCare' },
            { src: '/images/british-black/antiviral_b.svg', label: 'Antiviral\nSupport' },
        ]
    },
    {
        id: 'asianGold',
        name: 'Asian Gold',
        subtitle: 'with Hadong Green Tea',
        description: 'The bright, citrusy freshness of yuja (yuzu) blends with the deep taste of oolong, delivering vitamins you can drink.',
        imageDefault: '/images/asian_cup.webp',
        imageHover: '/images/asian.webp',
        popImage: '/images/asian-gold/asian_pop.webp',
        chartColor: '#bca591',
        radarData: [
            { subject: '호흡기(Respiratory)', A: 30, fullMark: 100 },
            { subject: '면역(Immunity)', A: 90, fullMark: 100 },
            { subject: '소화/해독(Digestion)', A: 55, fullMark: 100 },
            { subject: '활력(Energy)', A: 85, fullMark: 100 },
            { subject: '이완(Relaxation)', A: 60, fullMark: 100 },
        ],
        features: [
            { src: '/images/asian-gold/recovery_a.svg', label: 'Fatigue\nRecovery' },
            { src: '/images/asian-gold/imflammation_a.svg', label: 'Inflammation\nRelief' },
            { src: '/images/asian-gold/neutral_a.svg', label: 'Neutral Fat\nBreakdown' },
            { src: '/images/asian-gold/skin_a.svg', label: 'Skin-beautifying\nEffect' },
        ]
    },
    {
        id: 'hibiscusFruit',
        name: 'Hibiscus Fruit',
        subtitle: 'with Mungyeong Omija',
        description: 'Omija’s liver-cleansing support meets hibiscus’ diuretic action, helping a complete body cleanse.',
        imageDefault: '/images/hibis_cup.webp',
        imageHover: '/images/hibis.webp',
        popImage: '/images/hibiscus-fruit/hibis_pop.webp',
        chartColor: '#c09696',
        radarData: [
            { subject: '호흡기(Respiratory)', A: 20, fullMark: 100 },
            { subject: '면역(Immunity)', A: 40, fullMark: 100 },
            { subject: '소화/해독(Digestion)', A: 95, fullMark: 100 },
            { subject: '활력(Energy)', A: 40, fullMark: 100 },
            { subject: '이완(Relaxation)', A: 30, fullMark: 100 },
        ],
        features: [
            { src: '/images/hibiscus-fruit/liver_h.svg', label: 'Liver Detox\nSupport' },
            { src: '/images/hibiscus-fruit/stomach_h.svg', label: 'Improved Stomach\nFunction' },
            { src: '/images/hibiscus-fruit/carbohydrate_h.svg', label: 'Carbohydrate Metabolism\nBlocking' },
            { src: '/images/hibiscus-fruit/swelling_h.svg', label: 'Reduced\nSwelling' },
        ]
    },
    {
        id: 'mintyChocolat',
        name: 'Minty Chocolat',
        subtitle: 'with Peppermint & Cacao',
        description: 'The calmness of green tea meets refreshing mint, offering a restful moment that cools a busy mind.',
        imageDefault: '/images/minty_cup.webp',
        imageHover: '/images/minty.webp',
        popImage: '/images/minty-chocolat/minty_pop.webp',
        chartColor: '#7099a6',
        radarData: [
            { subject: '호흡기(Respiratory)', A: 30, fullMark: 100 },
            { subject: '면역(Immunity)', A: 40, fullMark: 100 },
            { subject: '소화/해독(Digestion)', A: 60, fullMark: 100 },
            { subject: '활력(Energy)', A: 40, fullMark: 100 },
            { subject: '이완(Relaxation)', A: 95, fullMark: 100 },
        ],
        features: [
            { src: '/images/minty-chocolat/relaxation_m.svg', label: 'Mind & Body\nRelaxation' },
            { src: '/images/minty-chocolat/body_m.svg', label: 'Body Fat\nReduction' },
            { src: '/images/minty-chocolat/headache_m.svg', label: 'Headache\nRelief' },
            { src: '/images/minty-chocolat/digestive_m.svg', label: 'Digestive Discomfort\nRelief' },
        ]
    }
];
