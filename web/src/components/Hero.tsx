import { motion } from 'framer-motion';

export interface HeroProps {
    onStartSurvey: () => void;
    onOpenBrandStory: () => void;
}

export function Hero({ onStartSurvey, onOpenBrandStory }: HeroProps) {
    return (
        <section className="relative w-full bg-white flex flex-col items-center pt-40 pb-16 overflow-hidden z-10">
            {/* Typography Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center px-6 mb-16 z-20"
            >
                <span className="text-sm font-semibold text-gray-500 mb-6 tracking-widest uppercase">
                    Premium Detox Ritual
                </span>
                <h1 className="font-sans font-bold text-gray-900 tracking-tighter leading-none text-7xl md:text-9xl whitespace-pre-line">
                    {"Feel Lighter\nToday."}
                </h1>
            </motion.div>

            {/* Media Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-[95%] max-w-6xl mx-auto aspect-video bg-gray-100 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex items-center justify-center group"
            >
                <span className="text-gray-400/60 font-medium text-lg tracking-widest select-none uppercase">
                    Video Placeholder
                </span>

                {/* Floating CTA Button */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-4 z-30 w-full max-w-md justify-center px-4">
                    <button
                        onClick={onStartSurvey}
                        className="bg-[#edc5c4] text-gray-900 px-10 py-4 md:py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-sm md:text-base"
                    >
                        나만의 블렌드 찾기
                    </button>
                    {/* Secondary Brand Story Button */}
                    <button
                        onClick={onOpenBrandStory}
                        className="bg-white/90 backdrop-blur-md text-gray-900 px-10 py-4 md:py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-sm md:text-base border border-gray-200"
                    >
                        브랜드 스토리
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
