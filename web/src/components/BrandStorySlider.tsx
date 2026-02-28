import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// TEA_PRODUCTS Data Migrated from previous project
const TEA_PRODUCTS = {
    british: {
        id: 'british',
        name: '브리티쉬 블랙',
        desc: '도라지와 홍차의 깊은 풍미',
        baseColor: '#8B0000',
        available: true,
        ingredients: {
            cacao: { name: '카카오', emoji: '🫘', stats: { structure: 2, refresh: 6, balance: 4, mood: 5, finish: 9 }, flavor: { sweet: 3, bitter: 5, nutty: 10, body: 9, aroma: 6 }, color: '#8B4513' },
            doraji: { name: '도라지', emoji: '🌾', stats: { structure: 10, refresh: 8, balance: 5, mood: 3, finish: 4 }, flavor: { sweet: 2, bitter: 8, nutty: 5, body: 4, aroma: 3 }, color: '#E8D4A8' },
            tea: { name: '홍차', emoji: '🍂', stats: { structure: 3, refresh: 5, balance: 7, mood: 9, finish: 5 }, flavor: { sweet: 1, bitter: 6, nutty: 4, body: 6, aroma: 8 }, color: '#B8423F' }
        }
    },
    asian: {
        id: 'asian',
        name: '아시안 골드',
        desc: '우롱과 유자의 산뜻한 만남',
        baseColor: '#D4AF37',
        available: true,
        ingredients: {
            cacao: { name: '카카오', emoji: '🫘', stats: { structure: 2, refresh: 6, balance: 4, mood: 5, finish: 9 }, flavor: { sweet: 1, bitter: 5, nutty: 10, body: 9, aroma: 6 }, color: '#5D4037' },
            oolong: { name: '우롱차', emoji: '🍃', stats: { structure: 4, refresh: 5, balance: 10, mood: 6, finish: 7 }, flavor: { sweet: 2, bitter: 4, nutty: 6, body: 5, aroma: 9 }, color: '#CC9900' },
            yuja: { name: '유자', emoji: '🍋', stats: { structure: 8, refresh: 10, balance: 7, mood: 8, finish: 6 }, flavor: { sweet: 1, bitter: 3, nutty: 0, body: 2, aroma: 10 }, color: '#FFD700' }
        }
    },
    hibiscus: {
        id: 'hibiscus',
        name: '히비스커스 프룻',
        desc: '밝은 과일 결과 산뜻한 마무리의 리프레시 무드',
        baseColor: '#E0115F',
        available: true,
        ingredients: {
            cacao: { name: '카카오', emoji: '🫘', stats: { structure: 2, refresh: 6, balance: 4, mood: 5, finish: 9 }, flavor: { sweet: 2, bitter: 5, nutty: 10, body: 9, aroma: 6 }, color: '#5D4037' },
            hibiscus: { name: '히비스커스 꽃잎', emoji: '🌺', stats: { structure: 3, refresh: 7, balance: 10, mood: 6, finish: 5 }, flavor: { sweet: 1, bitter: 1, nutty: 0, body: 2, aroma: 9 }, color: '#FF1493' },
            omija: { name: '문경 오미자', emoji: '🫐', stats: { structure: 8, refresh: 9, balance: 9, mood: 7, finish: 4 }, flavor: { sweet: 5, bitter: 4, nutty: 0, body: 4, aroma: 7 }, color: '#DC143C' }
        }
    },
    minty: {
        id: 'minty',
        name: '민티 쇼콜라',
        desc: '민트와 카카오가 대비를 이루는 선명한 애프터무드',
        baseColor: '#558B2F',
        available: true,
        ingredients: {
            cacao: { name: '카카오', emoji: '🫘', stats: { structure: 2, refresh: 6, balance: 4, mood: 5, finish: 9 }, flavor: { sweet: 2, bitter: 5, nutty: 10, body: 9, aroma: 6 }, color: '#5D4037' },
            matcha: { name: '제주 녹차', emoji: '🍵', stats: { structure: 5, refresh: 8, balance: 9, mood: 5, finish: 8 }, flavor: { sweet: 3, bitter: 6, nutty: 5, body: 5, aroma: 7 }, color: '#228B22' },
            mint: { name: '페퍼민트', emoji: '🌿', stats: { structure: 9, refresh: 4, balance: 10, mood: 7, finish: 9 }, flavor: { sweet: 1, bitter: 2, nutty: 0, body: 1, aroma: 10 }, color: '#00FF7F' }
        }
    }
}

const STAT_LABELS = { structure: '구조감', refresh: '리프레시', balance: '풍미 밸런스', mood: '무드 전환', finish: '여운' }
const FLAVOR_LABELS = { sweet: '단맛', bitter: '쓴맛', nutty: '고소함', body: '바디감', aroma: '향' }
const FLAVOR_COLORS = ['#F472B6', '#FB923C', '#A78BFA', '#38BDF8', '#4ADE80']
const TEA_DATA_ARRAY = Object.values(TEA_PRODUCTS);
const STAT_KEYS = Object.keys(STAT_LABELS) as Array<keyof typeof STAT_LABELS>;
const FLAVOR_KEYS = Object.keys(FLAVOR_LABELS) as Array<keyof typeof FLAVOR_LABELS>;

type BlendValues = { slot1: number; slot2: number; slot3: number };
type SlotKey = keyof BlendValues;
type StatKey = keyof typeof STAT_LABELS;
type FlavorKey = keyof typeof FLAVOR_LABELS;

type BlendArchetypeId = 'classicFocus' | 'balancedDaily' | 'fruityRefresh' | 'coolDessert' | 'softExoticBalance';

interface BlendArchetypeMeta {
    name: string;
    oneLiner: string;
}

interface SignatureProfile {
    id: keyof typeof TEA_PRODUCTS;
    name: string;
    archetypeId: BlendArchetypeId;
    stats: Record<StatKey, number>;
    flavor: Record<FlavorKey, number>;
}

interface SimilarityResult {
    id: keyof typeof TEA_PRODUCTS;
    name: string;
    similarity: number;
    archetypeId: BlendArchetypeId;
}

interface BlendReading {
    archetype: BlendArchetypeMeta;
    summary: string;
    features: string[];
    moments: string[];
    primaryMatch: SimilarityResult;
    secondaryMatch: SimilarityResult;
}

const SLOT_KEYS: SlotKey[] = ['slot1', 'slot2', 'slot3'];
const ANALYSIS_SETTLE_DELAY_MS = 160;
const ANALYSIS_TEXT_FADE_MS = 170;

const BLEND_ARCHETYPE_META: Record<BlendArchetypeId, BlendArchetypeMeta> = {
    classicFocus: {
        name: '클래식 포커스형',
        oneLiner: '단정한 구조감과 집중 리듬이 또렷한 타입입니다.',
    },
    balancedDaily: {
        name: '밸런스 데일리형',
        oneLiner: '과하지 않게 이어지는 균형감이 강점인 타입입니다.',
    },
    fruityRefresh: {
        name: '프루티 리프레시형',
        oneLiner: '밝은 전환감과 산뜻한 인상이 중심이 되는 타입입니다.',
    },
    coolDessert: {
        name: '쿨 디저트형',
        oneLiner: '만족감 있는 여운과 상쾌한 대비가 공존하는 타입입니다.',
    },
    softExoticBalance: {
        name: '소프트 이국 밸런스형',
        oneLiner: '은은한 이국성과 부드러운 레이어가 자연스러운 타입입니다.',
    },
};

const SIGNATURE_PROFILES: SignatureProfile[] = [
    {
        id: 'british',
        name: '브리티쉬 블랙',
        archetypeId: 'classicFocus',
        stats: { structure: 8.8, refresh: 3.8, balance: 6.8, mood: 7.8, finish: 8.6 },
        flavor: { sweet: 2.1, bitter: 6.5, nutty: 7.8, body: 8.6, aroma: 6.1 },
    },
    {
        id: 'asian',
        name: '아시안 골드',
        archetypeId: 'balancedDaily',
        stats: { structure: 6.3, refresh: 6.9, balance: 8.7, mood: 6.8, finish: 7.2 },
        flavor: { sweet: 2.4, bitter: 4.1, nutty: 5.8, body: 5.6, aroma: 8.8 },
    },
    {
        id: 'hibiscus',
        name: '히비스커스 프룻',
        archetypeId: 'fruityRefresh',
        stats: { structure: 4.1, refresh: 9.3, balance: 6.6, mood: 7.4, finish: 6.2 },
        flavor: { sweet: 4.8, bitter: 2.0, nutty: 0.6, body: 3.0, aroma: 8.9 },
    },
    {
        id: 'minty',
        name: '민티 쇼콜라',
        archetypeId: 'coolDessert',
        stats: { structure: 7.1, refresh: 8.2, balance: 7.4, mood: 7.3, finish: 8.4 },
        flavor: { sweet: 3.3, bitter: 4.6, nutty: 5.4, body: 6.2, aroma: 8.2 },
    },
];

const clampPercent = (value: number): number => {
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
};

const createInitialBlendValues = (): BlendValues => ({ slot1: 30, slot2: 20, slot3: 50 });

const normalizeBlendValues = (input: BlendValues): BlendValues => {
    const raw = SLOT_KEYS.map((key) => clampPercent(Math.round(input[key])));
    const total = raw[0] + raw[1] + raw[2];

    if (total === 100) {
        return { slot1: raw[0], slot2: raw[1], slot3: raw[2] };
    }

    if (total === 0) {
        return { slot1: 34, slot2: 33, slot3: 33 };
    }

    const scaled = raw.map((value) => (value / total) * 100);
    const base = scaled.map((value) => Math.floor(value));
    let remainder = 100 - (base[0] + base[1] + base[2]);

    const fractions = scaled
        .map((value, index) => ({ index, fraction: value - base[index] }))
        .sort((a, b) => b.fraction - a.fraction);

    for (let i = 0; i < fractions.length && remainder > 0; i += 1) {
        base[fractions[i].index] += 1;
        remainder -= 1;
    }

    return { slot1: base[0], slot2: base[1], slot3: base[2] };
};

const computeSimilarity = (
    statValues: Record<StatKey, number>,
    flavorValues: Record<FlavorKey, number>,
    signature: SignatureProfile,
): number => {
    const statDistance = STAT_KEYS.reduce((sum, key) => sum + ((statValues[key] - signature.stats[key]) ** 2), 0);
    const flavorDistance = FLAVOR_KEYS.reduce((sum, key) => sum + ((flavorValues[key] - signature.flavor[key]) ** 2), 0);
    const totalDistance = Math.sqrt(statDistance + flavorDistance);
    const maxDistance = 10 * Math.sqrt(STAT_KEYS.length + FLAVOR_KEYS.length);
    const normalized = maxDistance > 0 ? totalDistance / maxDistance : 0;
    return Math.max(0, Math.min(100, Math.round((1 - normalized) * 100)));
};

const redistributeBlendValues = (current: BlendValues, changedKey: SlotKey, nextValue: number): BlendValues => {
    const clamped = clampPercent(Math.round(nextValue));
    const remaining = 100 - clamped;
    const otherKeys = SLOT_KEYS.filter((key) => key !== changedKey);
    const firstKey = otherKeys[0];
    const secondKey = otherKeys[1];
    const otherSum = current[firstKey] + current[secondKey];

    if (otherSum <= 0) {
        const firstShare = Math.floor(remaining / 2);
        const secondShare = remaining - firstShare;
        return {
            ...current,
            [changedKey]: clamped,
            [firstKey]: firstShare,
            [secondKey]: secondShare,
        };
    }

    const firstShare = Math.round((remaining * current[firstKey]) / otherSum);
    const secondShare = remaining - firstShare;

    return {
        ...current,
        [changedKey]: clamped,
        [firstKey]: firstShare,
        [secondKey]: secondShare,
    };
};

interface SliderProps {
    label: string;
    value: number;
    onChange: (v: number) => void;
    emoji: string;
}

function SliderComponent({ label, value, onChange, emoji }: SliderProps) {
    return (
        <div className="flex items-center gap-4">
            <span className="text-2xl filter drop-shadow-sm">{emoji}</span>
            <span className="text-brand-text font-medium text-sm w-20 flex-shrink-0 font-sans tracking-wide">{label}</span>
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={value}
                onChange={(e) => onChange(Number((e.target as HTMLInputElement).value))}
                className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-brand-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
            />
            <span className="px-3 py-1 bg-white border border-gray-100 rounded-full text-xs font-bold w-14 text-center text-brand-text shadow-sm flex-shrink-0">
                {value}%
            </span>
        </div>
    )
}

interface BrandStorySliderProps {
    onClose: () => void;
}

export function BrandStorySlider({ onClose }: BrandStorySliderProps) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [values, setValues] = useState<BlendValues>(() => normalizeBlendValues(createInitialBlendValues()));
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visible, setVisible] = useState(false);
    const [canCloseByBackdrop, setCanCloseByBackdrop] = useState(false);
    const [displayedBlendReading, setDisplayedBlendReading] = useState<BlendReading | null>(null);
    const [analysisTextVisible, setAnalysisTextVisible] = useState(true);
    const slideTimerRef = useRef<number | null>(null);
    const analysisSettleTimerRef = useRef<number | null>(null);
    const analysisSwapTimerRef = useRef<number | null>(null);
    const analysisEnterFrameRef = useRef<number | null>(null);
    const analysisVisibleRef = useRef(true);
    const appliedBlendReadingKeyRef = useRef('');

    // Trigger the entrance animation on mount
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const t = requestAnimationFrame(() => setVisible(true));
        const interactiveTimer = window.setTimeout(() => {
            setCanCloseByBackdrop(true);
        }, 0);
        return () => {
            if (slideTimerRef.current) {
                window.clearTimeout(slideTimerRef.current);
                slideTimerRef.current = null;
            }
            if (analysisSettleTimerRef.current) {
                window.clearTimeout(analysisSettleTimerRef.current);
                analysisSettleTimerRef.current = null;
            }
            if (analysisSwapTimerRef.current) {
                window.clearTimeout(analysisSwapTimerRef.current);
                analysisSwapTimerRef.current = null;
            }
            if (analysisEnterFrameRef.current) {
                window.cancelAnimationFrame(analysisEnterFrameRef.current);
                analysisEnterFrameRef.current = null;
            }
            cancelAnimationFrame(t);
            window.clearTimeout(interactiveTimer);
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };

    const currentTea = TEA_DATA_ARRAY[currentSlideIndex];
    const blendTotal = values.slot1 + values.slot2 + values.slot3;
    const ingredientKeys = useMemo(
        () => Object.keys(currentTea.ingredients) as Array<keyof typeof currentTea.ingredients>,
        [currentTea],
    );

    const handleSlideChange = (direction: 'next' | 'prev') => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        if (slideTimerRef.current) {
            window.clearTimeout(slideTimerRef.current);
        }

        slideTimerRef.current = window.setTimeout(() => {
            if (direction === 'next') {
                setCurrentSlideIndex((prev) => (prev + 1) % TEA_DATA_ARRAY.length);
            } else {
                setCurrentSlideIndex((prev) => (prev - 1 + TEA_DATA_ARRAY.length) % TEA_DATA_ARRAY.length);
            }
            setValues(createInitialBlendValues());
            setIsTransitioning(false);
            slideTimerRef.current = null;
        }, 400);
    };

    const handleBlendValueChange = (slotKey: SlotKey, nextValue: number) => {
        setValues((prev) => normalizeBlendValues(redistributeBlendValues(prev, slotKey, nextValue)));
    };

    useEffect(() => {
        if (blendTotal !== 100) {
            setValues((prev) => normalizeBlendValues(prev));
        }
    }, [blendTotal]);

    const liquidColor = useMemo(() => {
        const total = values.slot1 + values.slot2 + values.slot3;
        if (total === 0) return 'rgba(255, 250, 240, 0.3)';

        const ing = currentTea.ingredients;
        const keys = ingredientKeys;

        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 200, g: 200, b: 200 };
        }

        const c1 = hexToRgb(ing[keys[0]]?.color || '#CCC');
        const c2 = hexToRgb(ing[keys[1]]?.color || '#CCC');
        const c3 = hexToRgb(ing[keys[2]]?.color || '#CCC');

        const w = [values.slot1 / 100, values.slot2 / 100, values.slot3 / 100];

        const r = Math.round(c1.r * w[0] * 0.4 + c2.r * w[1] * 0.35 + c3.r * w[2] * 0.35 + 25);
        const g = Math.round(c1.g * w[0] * 0.4 + c2.g * w[1] * 0.35 + c3.g * w[2] * 0.35 + 20);
        const b = Math.round(c1.b * w[0] * 0.4 + c2.b * w[1] * 0.35 + c3.b * w[2] * 0.35 + 15);
        const opacity = 0.3 + (total / 300) * 0.55;

        return `rgba(${Math.min(r, 255)}, ${Math.min(g, 255)}, ${Math.min(b, 255)}, ${opacity})`;
    }, [currentTea, ingredientKeys, values]);

    const profileData = useMemo(() => {
        const total = values.slot1 + values.slot2 + values.slot3;
        const ing = currentTea.ingredients;
        const keys = ingredientKeys;
        const vals = [values.slot1, values.slot2, values.slot3];

        return STAT_KEYS.map((statKey) => {
            let weightedSum = 0;
            if (total > 0) {
                keys.forEach((key, i) => {
                    weightedSum += (ing[key]?.stats[statKey] || 0) * vals[i];
                });
            }
            return { stat: STAT_LABELS[statKey as keyof typeof STAT_LABELS], value: total > 0 ? Math.round((weightedSum / total) * 10) / 10 : 0, fullMark: 10 };
        });
    }, [currentTea, ingredientKeys, values]);

    const flavorData = useMemo(() => {
        const total = values.slot1 + values.slot2 + values.slot3;
        const ing = currentTea.ingredients;
        const keys = ingredientKeys;
        const vals = [values.slot1, values.slot2, values.slot3];

        return FLAVOR_KEYS.map((flavorKey) => {
            let weightedSum = 0;
            if (total > 0) {
                keys.forEach((key, i) => {
                    weightedSum += (ing[key]?.flavor[flavorKey] || 0) * vals[i];
                });
            }
            return { name: FLAVOR_LABELS[flavorKey as keyof typeof FLAVOR_LABELS], value: total > 0 ? Math.round((weightedSum / total) * 10) / 10 : 0 };
        });
    }, [currentTea, ingredientKeys, values]);

    const statScoreByKey = useMemo(() => {
        return STAT_KEYS.reduce<Record<StatKey, number>>((acc, key, index) => {
            acc[key] = profileData[index]?.value || 0;
            return acc;
        }, {} as Record<StatKey, number>);
    }, [profileData]);

    const flavorScoreByKey = useMemo(() => {
        return FLAVOR_KEYS.reduce<Record<FlavorKey, number>>((acc, key, index) => {
            acc[key] = flavorData[index]?.value || 0;
            return acc;
        }, {} as Record<FlavorKey, number>);
    }, [flavorData]);

    const blendReading = useMemo<BlendReading>(() => {
        const archetypeScoreBoard: Array<{ id: BlendArchetypeId; score: number }> = [
            {
                id: 'classicFocus',
                score:
                    statScoreByKey.structure * 1.25 +
                    statScoreByKey.finish * 1.05 +
                    flavorScoreByKey.body * 1.1 +
                    flavorScoreByKey.bitter * 0.55 -
                    statScoreByKey.refresh * 0.35,
            },
            {
                id: 'balancedDaily',
                score:
                    statScoreByKey.balance * 1.35 +
                    statScoreByKey.finish * 0.7 +
                    statScoreByKey.mood * 0.9 +
                    flavorScoreByKey.body * 0.5,
            },
            {
                id: 'fruityRefresh',
                score:
                    statScoreByKey.refresh * 1.45 +
                    statScoreByKey.mood * 0.8 +
                    flavorScoreByKey.aroma * 1.15 +
                    flavorScoreByKey.sweet * 0.55 -
                    flavorScoreByKey.body * 0.25,
            },
            {
                id: 'coolDessert',
                score:
                    statScoreByKey.finish * 0.95 +
                    statScoreByKey.refresh * 0.7 +
                    flavorScoreByKey.nutty * 1.15 +
                    flavorScoreByKey.sweet * 0.8 +
                    flavorScoreByKey.body * 0.5,
            },
            {
                id: 'softExoticBalance',
                score:
                    statScoreByKey.balance * 1.2 +
                    flavorScoreByKey.aroma * 1.0 +
                    flavorScoreByKey.bitter * 0.45 +
                    statScoreByKey.finish * 0.6 +
                    statScoreByKey.structure * 0.35,
            },
        ];

        archetypeScoreBoard.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
        const currentArchetype = BLEND_ARCHETYPE_META[archetypeScoreBoard[0].id];

        const similarities: SimilarityResult[] = SIGNATURE_PROFILES.map((signature) => ({
            id: signature.id,
            name: signature.name,
            similarity: computeSimilarity(statScoreByKey, flavorScoreByKey, signature),
            archetypeId: signature.archetypeId,
        })).sort((a, b) => b.similarity - a.similarity || a.name.localeCompare(b.name));

        const primaryMatch = similarities[0];
        const secondaryMatch = similarities[1];

        const featureCandidates: Array<{ score: number; text: string }> = [
            { score: statScoreByKey.structure, text: '구조감이 또렷해 블렌드의 중심이 단정하게 유지됩니다.' },
            { score: statScoreByKey.refresh, text: '리프레시 결이 선명해 무드를 환기하기 좋은 흐름입니다.' },
            { score: statScoreByKey.balance, text: '풍미 밸런스가 안정적이라 데일리로 이어가기 편안합니다.' },
            { score: statScoreByKey.finish, text: '마무리 여운이 깔끔하게 남아 다음 한 모금까지 자연스럽게 이어집니다.' },
            { score: flavorScoreByKey.body, text: '바디감이 충분해 얇지 않고 밀도 있는 인상을 남깁니다.' },
            { score: flavorScoreByKey.aroma, text: '향의 레이어가 살아 있어 잔향까지 세련된 인상을 만듭니다.' },
            { score: flavorScoreByKey.nutty + flavorScoreByKey.sweet, text: '고소함과 단맛의 결이 맞물려 부드러운 만족감을 전합니다.' },
        ];

        const features = featureCandidates
            .sort((a, b) => b.score - a.score || a.text.localeCompare(b.text))
            .slice(0, 3)
            .map((item) => item.text);

        const momentCandidates: Array<{ score: number; label: string }> = [
            { score: statScoreByKey.refresh + flavorScoreByKey.aroma, label: '오후 리프레시' },
            { score: statScoreByKey.finish + statScoreByKey.balance, label: '식후 전환' },
            { score: statScoreByKey.mood + flavorScoreByKey.body, label: '차분한 작업 시간' },
            { score: statScoreByKey.refresh + statScoreByKey.balance, label: '아이스 티 타임' },
            { score: flavorScoreByKey.nutty + flavorScoreByKey.sweet, label: '디저트 무드 대체' },
            { score: statScoreByKey.balance + statScoreByKey.structure, label: '데일리 루틴' },
        ];

        const moments = momentCandidates
            .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
            .slice(0, 4)
            .map((item) => item.label);

        const summary = `${primaryMatch.name}의 결을 가장 가깝게 닮았고, ${secondaryMatch.name}의 포인트가 보조로 얹히는 분석형 블렌드입니다.`;

        return {
            archetype: currentArchetype,
            summary,
            features,
            moments,
            primaryMatch,
            secondaryMatch,
        };
    }, [flavorScoreByKey, statScoreByKey]);

    const blendReadingKey = useMemo(
        () => [
            blendReading.archetype.name,
            blendReading.summary,
            blendReading.features.join('|'),
            blendReading.primaryMatch.id,
            blendReading.primaryMatch.similarity,
            blendReading.secondaryMatch.id,
            blendReading.secondaryMatch.similarity,
            blendReading.moments.join('|'),
        ].join('::'),
        [blendReading],
    );

    useEffect(() => {
        if (!displayedBlendReading) {
            appliedBlendReadingKeyRef.current = blendReadingKey;
            setDisplayedBlendReading(blendReading);
            analysisVisibleRef.current = true;
            setAnalysisTextVisible(true);
            return;
        }

        if (appliedBlendReadingKeyRef.current === blendReadingKey) {
            return;
        }

        if (analysisSettleTimerRef.current) {
            window.clearTimeout(analysisSettleTimerRef.current);
            analysisSettleTimerRef.current = null;
        }
        if (analysisSwapTimerRef.current) {
            window.clearTimeout(analysisSwapTimerRef.current);
            analysisSwapTimerRef.current = null;
        }
        if (analysisEnterFrameRef.current) {
            window.cancelAnimationFrame(analysisEnterFrameRef.current);
            analysisEnterFrameRef.current = null;
        }

        analysisSettleTimerRef.current = window.setTimeout(() => {
            if (analysisVisibleRef.current) {
                analysisVisibleRef.current = false;
                setAnalysisTextVisible(false);
            }

            analysisSwapTimerRef.current = window.setTimeout(() => {
                setDisplayedBlendReading(blendReading);
                appliedBlendReadingKeyRef.current = blendReadingKey;
                analysisEnterFrameRef.current = window.requestAnimationFrame(() => {
                    analysisVisibleRef.current = true;
                    setAnalysisTextVisible(true);
                });
            }, ANALYSIS_TEXT_FADE_MS);
        }, ANALYSIS_SETTLE_DELAY_MS);
    }, [blendReading, blendReadingKey, displayedBlendReading]);

    const readingToRender = displayedBlendReading ?? blendReading;

    return createPortal(
        /* ── Layer 1: Full-screen overlay backdrop ── */
        <div
            className={`fixed inset-0 z-[9998] h-[100dvh] flex items-center justify-center p-4 md:p-8 transition-all duration-300 ease-out ${visible ? 'bg-black/40 backdrop-blur-md opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'
                }`}
            onMouseDown={(e) => {
                if (!canCloseByBackdrop) return;
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            {/* ── Layer 2: White modal container box ── */}
            <div
                className={`relative bg-[#FDFCFB] w-full max-w-5xl max-h-[90dvh] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${visible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                    }`}
            >
                {/* Scrollable inner area */}
                <div className="max-h-[90dvh] overflow-y-auto overflow-x-hidden">

                    {/* ── Close Button ── */}
                    <button
                        onClick={handleClose}
                        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-brand-text/60 hover:text-brand-text transition-all duration-200 shadow-sm"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* ── Slider Content ── */}
                    <div className={`w-full px-8 py-12 md:px-12 md:py-14 flex flex-col items-center gap-10 transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'
                        }`}>

                        {/* Header Typography */}
                        <div className="text-center flex flex-col items-center gap-4">
                            <h2 className="font-serif text-[28px] md:text-[38px] lg:text-[48px] tracking-tight text-brand-text">
                                Cacao Signature Tea Lab
                            </h2>
                            <p className="font-sans text-brand-text/70 text-sm md:text-base tracking-[0.2em] font-medium uppercase relative">
                                {currentTea.name}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-px bg-brand-accent/50"></span>
                            </p>
                            <p className="font-sans text-brand-text/60 mt-4 text-sm md:text-[15px] font-light tracking-wide break-keep max-w-[400px]">
                                {currentTea.desc}
                            </p>
                        </div>

                        {/* Main Teapot and Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full">

                            {/* Teapot Visualizer */}
                            <div className="relative flex justify-center group">
                                {/* Glowing Aura */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] blur-[80px] rounded-full transition-colors duration-500 z-0"
                                    style={{ backgroundColor: liquidColor }}
                                />
                                <div className="relative z-10 w-[260px] h-[260px] md:w-[340px] md:h-[340px]">
                                    {/* Liquid color — clipped to teapot shape using mask-image */}
                                    <div
                                        className="absolute inset-0 z-10 transition-colors duration-500"
                                        style={{
                                            maskImage: 'url(/images/detox_order/teapot_mask.png)',
                                            maskSize: 'contain',
                                            maskRepeat: 'no-repeat',
                                            maskPosition: 'center',
                                            WebkitMaskImage: 'url(/images/detox_order/teapot_mask.png)',
                                            WebkitMaskSize: 'contain',
                                            WebkitMaskRepeat: 'no-repeat',
                                            WebkitMaskPosition: 'center',
                                        }}
                                    >
                                        <div
                                            className="absolute inset-x-[15%] bottom-[12%] top-[30%] transition-colors duration-500"
                                            style={{ backgroundColor: liquidColor, borderRadius: '40% 40% 45% 45%' }}
                                        />
                                    </div>
                                    {/* Empty Teapot Base */}
                                    <img src="/images/detox_order/teapot_empty.png" alt="Teapot" className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none drop-shadow-2xl" />
                                    {/* Gloss Overlay */}
                                    <img src="/images/detox_order/teapot_mask.png" alt="Gloss" className="absolute inset-0 w-full h-full object-contain z-30 pointer-events-none opacity-60 mix-blend-screen" />
                                </div>
                            </div>

                            {/* Charts and Blending Controls */}
                            <div className="flex flex-col gap-8 w-full">

                                {/* Data Charts */}
                                <div className="flex flex-row justify-around gap-4 w-full">
                                    {/* Radar Chart */}
                                    <div className="flex flex-col items-center flex-1">
                                        <h3 className="text-brand-text text-xs font-serif font-medium tracking-widest uppercase mb-3">Profile Balance</h3>
                                        <div className="w-[140px] h-[140px] md:w-[170px] md:h-[170px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={profileData}>
                                                    <PolarGrid stroke="#d1d5db" strokeOpacity={0.6} gridType="polygon" />
                                                    <PolarAngleAxis dataKey="stat" tick={{ fill: '#374151', fontSize: 10, fontWeight: 500 }} />
                                                    <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                                                    <Radar dataKey="value" stroke="#edc5c4" strokeWidth={2} fill="#edc5c4" fillOpacity={0.3} isAnimationActive={true} animationDuration={400} />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* Bar Chart */}
                                    <div className="flex flex-col items-center flex-1">
                                        <h3 className="text-brand-text text-xs font-serif font-medium tracking-widest uppercase mb-3">Flavor Profile</h3>
                                        <div className="w-[140px] h-[140px] md:w-[170px] md:h-[170px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={flavorData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
                                                    <XAxis type="number" domain={[0, 10]} hide />
                                                    <YAxis type="category" dataKey="name" width={40} tick={{ fill: '#374151', fontSize: 10, fontWeight: 500 }} axisLine={false} tickLine={false} />
                                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={true} animationDuration={400} barSize={10}>
                                                        {flavorData.map((_, index) => (
                                                            <Cell key={`cell-${index}`} fill={FLAVOR_COLORS[index]} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>

                                {/* Blending Control Sliders */}
                                <div className="flex flex-col w-full bg-white/80 border border-gray-100 p-5 md:p-7 rounded-2xl shadow-sm backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-5 border-b border-brand-text/10 pb-4">
                                        <span className="text-brand-text font-serif text-base tracking-wide">Blending Control</span>
                                        <span className="text-[11px] uppercase tracking-[0.12em] text-brand-text/45">total {blendTotal}%</span>
                                        <div className="ml-auto w-7 h-7 rounded-full shadow-inner border border-white/50 transition-colors duration-500" style={{ backgroundColor: liquidColor }} />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {ingredientKeys.map((key, index) => {
                                            const ing = currentTea.ingredients[key];
                                            const slotKey = `slot${index + 1}` as SlotKey;
                                            return (
                                                <SliderComponent
                                                    key={key}
                                                    label={ing.name}
                                                    value={values[slotKey]}
                                                    onChange={(v) => handleBlendValueChange(slotKey, v)}
                                                    emoji={ing.emoji}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="w-full rounded-2xl border border-brand-text/10 bg-[#fcf8f6] p-5 md:p-6 space-y-4">
                                    <div
                                        className={`space-y-4 transform-gpu will-change-transform transition-opacity transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] ${analysisTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0.5'}`}
                                        style={{ transitionDuration: `${ANALYSIS_TEXT_FADE_MS}ms` }}
                                    >
                                    <div className="flex items-center justify-between gap-3 border-b border-brand-text/10 pb-3">
                                        <div>
                                            <p className="text-[11px] font-sans font-bold tracking-[0.16em] uppercase text-brand-text/45">Current Blend Analysis</p>
                                            <p className="font-serif text-[18px] text-brand-text mt-1">{readingToRender.archetype.name}</p>
                                        </div>
                                        <span className="rounded-full border border-brand-text/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-text/65 bg-white/80">
                                            Live Reading
                                        </span>
                                    </div>

                                    <p className="text-[14px] leading-relaxed text-brand-text/75">{readingToRender.archetype.oneLiner}</p>
                                    <p className="text-[14px] leading-relaxed text-brand-text/75">{readingToRender.summary}</p>

                                    <div className="space-y-2">
                                        {readingToRender.features.map((feature, index) => (
                                            <p key={`${feature}-${index}`} className="text-[13px] leading-relaxed text-brand-text/70">
                                                {index + 1}. {feature}
                                            </p>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-brand-text/10 bg-white/85 p-3.5">
                                            <p className="text-[10px] uppercase tracking-[0.14em] text-brand-text/45 mb-1">Closest Signature</p>
                                            <p className="font-serif text-[18px] text-brand-text">{readingToRender.primaryMatch.name}</p>
                                            <p className="text-[12px] text-brand-accent font-semibold mt-1">Similarity {readingToRender.primaryMatch.similarity}%</p>
                                        </div>
                                        <div className="rounded-xl border border-brand-text/10 bg-white/85 p-3.5">
                                            <p className="text-[10px] uppercase tracking-[0.14em] text-brand-text/45 mb-1">Second Match</p>
                                            <p className="font-serif text-[18px] text-brand-text">{readingToRender.secondaryMatch.name}</p>
                                            <p className="text-[12px] text-brand-text/65 font-semibold mt-1">Similarity {readingToRender.secondaryMatch.similarity}%</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.14em] text-brand-text/45 mb-2">Best Moments</p>
                                        <div className="flex flex-wrap gap-2">
                                            {readingToRender.moments.map((moment) => (
                                                <span
                                                    key={moment}
                                                    className="inline-flex items-center rounded-full border border-brand-text/12 bg-white/90 px-3 py-1 text-[12px] font-medium text-brand-text/70"
                                                >
                                                    {moment}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Dots */}
                        <div className="flex gap-3 pt-2">
                            {TEA_DATA_ARRAY.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (isTransitioning || idx === currentSlideIndex) return;
                                        setCurrentSlideIndex(idx);
                                        setValues(createInitialBlendValues());
                                    }}
                                    className={`h-2 rounded-full transition-all duration-500 ${idx === currentSlideIndex
                                        ? 'bg-brand-accent w-10'
                                        : 'bg-brand-text/20 hover:bg-brand-accent/50 w-2'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Footer Mark */}
                        <p className="text-brand-text/30 text-xs font-serif flex items-center gap-2">
                            <span>Very Good Chocolate Studio</span>
                            <span className="block w-1 h-1 rounded-full bg-brand-accent/50"></span>
                            <span>Est. 2024</span>
                        </p>

                    </div>
                </div>

                {/* Navigation Arrows — positioned relative to modal box */}
                <div className="absolute top-1/2 -left-5 md:-left-6 -translate-y-1/2 z-40">
                    <button
                        onClick={() => handleSlideChange('prev')}
                        className="p-3 rounded-full bg-white shadow-lg text-brand-text/50 hover:text-brand-accent hover:shadow-xl transition-all duration-300 hover:-translate-x-0.5"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
                <div className="absolute top-1/2 -right-5 md:-right-6 -translate-y-1/2 z-40">
                    <button
                        onClick={() => handleSlideChange('next')}
                        className="p-3 rounded-full bg-white shadow-lg text-brand-text/50 hover:text-brand-accent hover:shadow-xl transition-all duration-300 hover:translate-x-0.5"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
