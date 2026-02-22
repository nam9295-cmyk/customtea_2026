import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeaDetailModal from '../components/TeaDetailModal';
import { teaDetails } from '../data/teaDetails';

export interface FeatureSection1Props {
    onStartSurvey: () => void;
}

export function FeatureSection1({ onStartSurvey }: FeatureSection1Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeTea = teaDetails[activeIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % teaDetails.length);
        }, 4500); // Crossfade interval
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full px-6 md:px-[60px] py-24 bg-white flex justify-center">
            <div className="w-full max-w-6xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <div className="flex flex-col-reverse md:grid md:grid-cols-2">

                    {/* Typography & CTA (Bottom on Mobile, Left on Desktop) */}
                    <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24">
                        <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3 md:mb-4">
                            PERSONALIZED DETOX
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 md:mb-6 tracking-tight">
                            요즘 당신의 몸이 보내는 신호는 무엇인가요?
                        </h2>
                        <p className="text-gray-600 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
                            몇 가지 간단한 질문을 통해, 4가지 디톡스 워터 중 지금 당신에게 가장 완벽한 밸런스를 찾아드립니다.
                        </p>
                        <div>
                            <button
                                onClick={onStartSurvey}
                                className="bg-[#edc5c4] text-gray-900 px-8 py-3.5 md:px-10 md:py-4 rounded-full font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent text-sm md:text-base"
                            >
                                나만의 블렌드 찾기
                            </button>
                        </div>
                    </div>

                    {/* Media Carousel (Top on Mobile, Right on Desktop) */}
                    <div className="w-full h-[350px] md:h-full md:min-h-[500px] relative p-0 overflow-hidden md:rounded-bl-none md:rounded-r-2xl bg-[#fcf9f9] flex items-center justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTea.id}
                                className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            >
                                {/* Scale down slightly on mobile to fit the container perfectly */}
                                <div className="transform scale-75 md:scale-100 flex items-center justify-center w-full h-full">
                                    <TeaDetailModal tea={activeTea} onClose={() => { }} isInline={true} showChart={false} />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
