import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

export interface FeatureSection2Props {
    onStartBlending: () => void;
}

export function FeatureSection2({ onStartBlending }: FeatureSection2Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"],
    });

    // Core Spring for organic, liquid-like dragging tracking
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 44, damping: 30, mass: 0.5, restDelta: 0.003 });

    // Scroll Velocity to calculate real-time tension/bounce effects on UI
    const scrollVelocity = useVelocity(smoothProgress);
    const smoothVelocity = useSpring(scrollVelocity, { stiffness: 120, damping: 36, mass: 0.3, restDelta: 0.001 });
    const velocityMagnitude = useTransform(smoothVelocity, (v) => Math.min(Math.abs(v) * 0.35, 1));

    // Sliders Tense up when actively blending/scrolling
    const thumbScale = useTransform(velocityMagnitude, [0, 1], [1, 1.08]);
    const thumbShadow = useTransform(velocityMagnitude, [0, 1],
        ["0px 1px 2px rgba(0,0,0,0.08)", "0px 4px 8px rgba(0,0,0,0.18)"],
    );
    const textBouncyScale = useTransform(velocityMagnitude, [0, 1], [1, 1.06]);

    // 1. Right Box - Sliders Mapping (using smoothProgress)
    const cacaoNum = useTransform(smoothProgress, [0, 1], [35, 65]);
    const cacaoRounded = useTransform(cacaoNum, (v) => Math.round(v));
    const cacaoText = useTransform(cacaoRounded, (v) => `${v}%`);
    const cacaoWidth = useTransform(cacaoRounded, (v) => `${v}%`);

    const hibisNum = useTransform(cacaoRounded, (v) => 100 - v);
    const hibisText = useTransform(hibisNum, (v) => `${Math.round(v)}%`);
    const hibisWidth = useTransform(hibisNum, (v) => `${Math.round(v)}%`);

    // 2. Left Box - Top Liquid Mapping
    const liquidColor = useTransform(smoothProgress, [0, 0.5, 1], ["rgba(93, 64, 55, 0.05)", "rgba(180, 60, 60, 0.4)", "rgba(255, 20, 147, 0.65)"]);

    // 3. Left Box - Bottom Radar Chart Polygon Mapping
    const radarPoints = useTransform(smoothProgress, (v) => {
        const relaxation = 20 + v * 40;
        const refresh = 20 + v * 60;
        const digestion = 20 + v * 70;
        const energy = 20 + v * 30;
        const structure = 20 + v * 50;

        const getPt = (val: number, angleDeg: number) => {
            const rad = (angleDeg - 90) * (Math.PI / 180);
            const r = (val / 100) * 45;
            return `${50 + r * Math.cos(rad)},${50 + r * Math.sin(rad)}`;
        };

        return `${getPt(relaxation, 0)} ${getPt(refresh, 72)} ${getPt(digestion, 144)} ${getPt(energy, 216)} ${getPt(structure, 288)}`;
    });

    // 4. Left Box - Bottom Bar Chart Mapping (Flavor)
    const bodyWidth = useTransform(smoothProgress, [0, 1], ["20%", "85%"]);
    const acidityWidth = useTransform(smoothProgress, [0, 1], ["10%", "75%"]);
    const sweetnessWidth = useTransform(smoothProgress, [0, 1], ["15%", "45%"]);

    return (
        <section ref={containerRef} className="relative w-full min-h-[280svh] md:min-h-[300vh] bg-[#fdfbf9]">
            {/* Sticky Wrapper - anchors the viewport during 300vh scroll. */}
            <div className="sticky top-0 h-[100svh] md:h-[100dvh] w-full flex items-center justify-center pt-2 md:pt-24 lg:pt-0 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 items-start lg:items-center">

                        {/* LEFT AREA: Integrated Visualization Data (Column) */}
                        <div className="relative w-full rounded-2xl md:rounded-3xl bg-white shadow-xl border border-brand-text/5 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-10 gap-3 sm:gap-6 lg:gap-10 shrink-0 [contain:layout_paint]">

                            {/* TOP: Dynamic Teapot */}
                            <div className="relative w-[130px] h-[130px] sm:w-[200px] sm:h-[200px] lg:w-[320px] lg:h-[320px] shrink-0">
                                <div
                                    className="absolute inset-0 z-10"
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
                                    <motion.div
                                        className="absolute inset-x-[15%] bottom-[12%] top-[30%] will-change-[background-color]"
                                        style={{ backgroundColor: liquidColor, borderRadius: '40% 40% 45% 45%' }}
                                    />
                                </div>
                                <img src="/images/detox_order/teapot_empty.png" alt="Teapot Base" className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none drop-shadow-2xl" />
                                <img src="/images/detox_order/teapot_mask.png" alt="Gloss Reflection" className="absolute inset-0 w-full h-full object-contain z-30 pointer-events-none opacity-60 mix-blend-screen" />
                            </div>

                            {/* MIDDLE: Data Visualizations (Radar & Bar Charts) */}
                            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg shrink-0">

                                <div className="flex flex-col items-center bg-gray-50/50 p-2 sm:p-4 md:p-5 rounded-2xl border border-gray-100 h-[120px] sm:h-[160px] md:h-[180px]">
                                    <h3 className="text-brand-text text-[8px] sm:text-[10px] font-serif font-bold tracking-widest uppercase mb-auto opacity-50">Profile</h3>
                                    <div className="w-[85px] h-[85px] sm:w-[110px] sm:h-[110px] relative shrink-0">
                                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                            {/* Grid Guidelines */}
                                            <polygon points="50,5 95,38 78,92 22,92 5,38" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                                            <polygon points="50,27 72,43 64,68 36,68 28,43" fill="none" stroke="#e5e7eb" strokeWidth="1" />

                                            {/* Animated Data Polygon */}
                                            <motion.polygon points={radarPoints} fill="#edc5c4" fillOpacity="0.5" stroke="#edc5c4" strokeWidth="1.2" className="will-change-transform" />

                                            {/* Axis Labels */}
                                            <text x="50" y="-4" fontSize="6.5" fontWeight="600" textAnchor="middle" fill="#6b7280">여운</text>
                                            <text x="102" y="39" fontSize="6.5" fontWeight="600" textAnchor="start" fill="#6b7280">리프레시</text>
                                            <text x="83" y="103" fontSize="6.5" fontWeight="600" textAnchor="middle" fill="#6b7280">풍미</text>
                                            <text x="17" y="103" fontSize="6.5" fontWeight="600" textAnchor="middle" fill="#6b7280">무드</text>
                                            <text x="-2" y="39" fontSize="6.5" fontWeight="600" textAnchor="end" fill="#6b7280">구조감</text>
                                        </svg>
                                    </div>
                                </div>

                                {/* Bar Chart (Flavor Profile) */}
                                <div className="flex flex-col items-start bg-gray-50/50 p-3 sm:p-4 md:p-5 rounded-2xl border border-gray-100 h-[120px] sm:h-[160px] md:h-[180px]">
                                    <h3 className="text-brand-text text-[8px] sm:text-[10px] font-serif font-bold tracking-widest uppercase mb-auto opacity-50 w-full text-center">Flavor</h3>
                                    <div className="flex flex-col justify-end gap-2 sm:gap-[14px] md:gap-4 w-full h-full pb-1 sm:pb-2">
                                        <div className="w-full">
                                            <div className="flex justify-between text-[9px] sm:text-[10px] font-bold text-brand-text opacity-70 mb-1">
                                                <span>바디감</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <motion.div className="h-full bg-[#5D4037] rounded-full origin-left transform-gpu will-change-transform" style={{ width: bodyWidth }} />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex justify-between text-[9px] sm:text-[10px] font-bold text-brand-text opacity-70 mb-1">
                                                <span>신맛</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <motion.div className="h-full bg-brand-accent rounded-full origin-left transform-gpu will-change-transform" style={{ width: acidityWidth }} />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex justify-between text-[9px] sm:text-[10px] font-bold text-brand-text opacity-70 mb-1">
                                                <span>단맛</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <motion.div className="h-full bg-rose-300 rounded-full origin-left transform-gpu will-change-transform" style={{ width: sweetnessWidth }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* BOTTOM ON MOBILE/TABLET: Desktop hides this. Sliders rendered exactly under charts. */}
                            <div className="flex lg:hidden flex-col gap-4 sm:gap-6 md:gap-8 w-full max-w-lg shrink-0 mt-1 sm:mt-2 md:mt-4">
                                {/* Cacao Thick Dynamic Slider */}
                                <div className="relative w-full">
                                    <div className="flex justify-between items-end mb-2 sm:mb-3">
                                        <span className="text-[10px] sm:text-xs font-bold text-brand-text tracking-widest">본연의 카카오</span>
                                        <motion.span
                                            className="text-lg sm:text-2xl font-extrabold text-[#5D4037] origin-bottom-right transform-gpu will-change-transform"
                                            style={{ scale: textBouncyScale }}
                                        >{cacaoText}</motion.span>
                                    </div>
                                    <div className="relative h-3 w-full bg-gray-200 rounded-full shadow-inner">
                                        <motion.div
                                            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#8D6E63] to-[#5D4037] rounded-full origin-left overflow-visible transform-gpu will-change-transform"
                                            style={{ width: cacaoWidth }}
                                        >
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full bg-white/20 opacity-60 rounded-r-full" />
                                        </motion.div>
                                        <motion.div
                                            className="absolute top-1/2 -ml-3 w-6 h-6 bg-white rounded-full border-[3px] border-[#5D4037] z-10 transform-gpu will-change-transform"
                                            style={{ left: cacaoWidth, y: "-50%", scale: thumbScale, boxShadow: thumbShadow }}
                                        />
                                    </div>
                                </div>

                                {/* Hibiscus Thick Dynamic Slider */}
                                <div className="relative w-full">
                                    <div className="flex justify-between items-end mb-2 sm:mb-3">
                                        <span className="text-[10px] sm:text-xs font-bold text-brand-accent tracking-widest">프리미엄 히비스커스</span>
                                        <motion.span
                                            className="text-lg sm:text-2xl font-extrabold text-brand-accent origin-bottom-right transform-gpu will-change-transform"
                                            style={{ scale: textBouncyScale }}
                                        >{hibisText}</motion.span>
                                    </div>
                                    <div className="relative h-3 w-full bg-rose-50 rounded-full shadow-inner">
                                        <motion.div
                                            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#edc5c4] to-[#c89f9e] rounded-full origin-left overflow-visible transform-gpu will-change-transform"
                                            style={{ width: hibisWidth }}
                                        >
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full bg-white/30 opacity-70 rounded-r-full" />
                                        </motion.div>
                                        <motion.div
                                            className="absolute top-1/2 -ml-3 w-6 h-6 bg-white rounded-full border-[3px] border-[#c89f9e] z-10 transform-gpu will-change-transform"
                                            style={{ left: hibisWidth, y: "-50%", scale: thumbScale, boxShadow: thumbShadow }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT AREA: Typography & Desktop Sliders */}
                        <div className="flex flex-col justify-center w-full max-w-xl mx-auto xl:mx-0 relative shrink-0 pt-0 sm:pt-4 pb-4 md:pb-8 lg:py-0">
                            <span className="text-[10px] sm:text-[11px] md:text-sm font-semibold text-brand-accent uppercase tracking-widest mb-1 sm:mb-2 md:mb-4 text-center lg:text-left">
                                SCROLL TO BLEND
                            </span>
                            <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-6xl font-bold text-gray-900 leading-[1.15] mb-2 sm:mb-4 md:mb-6 tracking-tight text-center lg:text-left">
                                스크롤하여 당신만의<br className="hidden sm:block" />비율을 완성하세요.
                            </h2>
                            <p className="text-brand-text/60 mb-4 sm:mb-6 md:mb-12 text-[12px] sm:text-sm md:text-[15px] lg:text-lg leading-relaxed font-light text-center lg:text-left">
                                카카오의 깊고 묵직한 베이스에 상큼한 히비스커스가 더해지는 과정을 경험하세요. 휠을 움직일 때마다 환상적인 밸런스가 조율됩니다.
                            </p>

                            {/* Desktop Dashboard Area - Mobile hides this */}
                            <div className="hidden lg:flex flex-col gap-10 mb-12 w-full bg-white/60 p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white backdrop-blur-md">

                                {/* Cacao Desktop */}
                                <div className="relative w-full">
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-sm font-bold text-brand-text tracking-widest">본연의 카카오</span>
                                        <motion.span
                                            className="text-3xl font-extrabold text-[#5D4037] origin-bottom-right transform-gpu will-change-transform"
                                            style={{ scale: textBouncyScale }}
                                        >{cacaoText}</motion.span>
                                    </div>
                                    <div className="relative h-4 w-full bg-gray-200 rounded-full shadow-inner">
                                        <motion.div
                                            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#8D6E63] to-[#5D4037] rounded-full origin-left overflow-visible transform-gpu will-change-transform"
                                            style={{ width: cacaoWidth }}
                                        >
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full bg-white/20 opacity-60 rounded-r-full" />
                                        </motion.div>
                                        <motion.div
                                            className="absolute top-1/2 -ml-3.5 w-7 h-7 bg-white rounded-full border-[3px] border-[#5D4037] z-10 transform-gpu will-change-transform"
                                            style={{ left: cacaoWidth, y: "-50%", scale: thumbScale, boxShadow: thumbShadow }}
                                        />
                                    </div>
                                </div>

                                {/* Hibiscus Desktop */}
                                <div className="relative w-full">
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-sm font-bold text-brand-accent tracking-widest">프리미엄 히비스커스</span>
                                        <motion.span
                                            className="text-3xl font-extrabold text-brand-accent origin-bottom-right transform-gpu will-change-transform"
                                            style={{ scale: textBouncyScale }}
                                        >{hibisText}</motion.span>
                                    </div>
                                    <div className="relative h-4 w-full bg-rose-50 rounded-full shadow-inner">
                                        <motion.div
                                            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#edc5c4] to-[#c89f9e] rounded-full origin-left overflow-visible transform-gpu will-change-transform"
                                            style={{ width: hibisWidth }}
                                        >
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full bg-white/30 opacity-70 rounded-r-full" />
                                        </motion.div>
                                        <motion.div
                                            className="absolute top-1/2 -ml-3.5 w-7 h-7 bg-white rounded-full border-[3px] border-[#c89f9e] z-10 transform-gpu will-change-transform"
                                            style={{ left: hibisWidth, y: "-50%", scale: thumbScale, boxShadow: thumbShadow }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Direct Action Button */}
                            <div className="flex justify-center lg:justify-start">
                                <button
                                    onClick={onStartBlending}
                                    className="border border-brand-text text-brand-text rounded-full px-6 md:px-8 lg:px-10 py-2.5 md:py-3.5 lg:py-4 text-[13px] md:text-sm lg:text-base font-bold hover:bg-brand-text hover:text-white transition-all duration-300 flex items-center gap-2 lg:gap-3 group"
                                >
                                    레시피 자세히 보기
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
