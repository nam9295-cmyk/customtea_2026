import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FeatureSection2Props {
    onStartSurvey: () => void;
}

export function FeatureSection2({ onStartSurvey }: FeatureSection2Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const teaCards = [
        "/images/british.webp",
        "/images/asian.webp",
        "/images/hibis.webp",
        "/images/minty.webp"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % teaCards.length);
        }, 4500); // Crossfade interval
        return () => clearInterval(timer);
    }, [teaCards.length]);

    return (
        <section className="w-full bg-[#fdfbf9] md:bg-rose-50/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Side: Media Showcase (Slow Crossfade Carousel & UI Overlay) */}
                    <div className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl bg-white shadow-xl overflow-hidden border border-gray-100 flex items-center justify-center">
                        <AnimatePresence>
                            {teaCards.map((src, index) => (
                                <motion.img
                                    key={src}
                                    src={src}
                                    alt="Premium Tea Blend"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: index === activeIndex ? 1 : 0 }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                />
                            ))}
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none"></div>

                        {/* Decorative UI Element: Sliders Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white flex flex-col gap-4 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 cursor-default">
                            {/* Cacao Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-gray-800 tracking-wider">
                                    <span>CACAO</span>
                                    <span>55%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-800 rounded-full w-[55%]"></div>
                                </div>
                            </div>
                            {/* Hibiscus Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-[#c89f9e] tracking-wider">
                                    <span>HIBISCUS</span>
                                    <span>81%</span>
                                </div>
                                <div className="h-1.5 w-full bg-rose-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#c89f9e] rounded-full w-[81%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Typography & CTA */}
                    <div className="flex flex-col justify-center max-w-xl">
                        <span className="text-sm font-semibold text-[#c89f9e] uppercase tracking-widest mb-4">
                            BLENDING CONTROL
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
                            단 1%의 비율까지,<br />오직 당신만을 위해.
                        </h2>
                        <p className="text-gray-600 mb-10 text-lg leading-relaxed font-light">
                            카카오의 묵직함, 히비스커스의 상큼함, 오미자의 깊은 맛. 세 가지 프리미엄 재료의 비율을 직접 조절하여 나만의 디톡스 레시피를 완성해 보세요.
                        </p>
                        <div>
                            <button
                                onClick={onStartSurvey}
                                className="border-2 border-gray-900 text-gray-900 rounded-full px-8 py-3.5 font-bold hover:bg-gray-900 hover:text-white transition-colors duration-300 flex items-center gap-3 group"
                            >
                                블렌딩 시작하기
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
