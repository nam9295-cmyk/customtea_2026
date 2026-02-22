import { motion, useScroll, useTransform } from 'framer-motion';

export interface HeroProps {
    onStartSurvey: () => void;
    onOpenBrandStory: () => void;
}

export function Hero({ onStartSurvey, onOpenBrandStory }: HeroProps) {
    const { scrollY } = useScroll();

    // Text enters the box: slides down INTO the box, shrinks, fades out near end of box
    const textY = useTransform(scrollY, [0, 400], [0, 260]);
    const textScale = useTransform(scrollY, [0, 400], [1, 0.6]);
    const textOpacity = useTransform(scrollY, [550, 750], [1, 0]);

    return (
        <section className="relative w-full bg-white flex flex-col items-center pt-40 pb-16">

            {/* Typography (In FRONT of the box — z-20) */}
            <motion.div
                style={{ y: textY, scale: textScale, opacity: textOpacity }}
                className="relative z-20 flex flex-col items-center text-center px-6 mb-8"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                >
                    <span className="text-sm font-semibold text-gray-500 mb-6 tracking-widest uppercase">
                        Premium Detox Water
                    </span>
                    <h1 className="font-sans font-bold text-gray-900 tracking-tighter leading-none text-4xl sm:text-6xl md:text-8xl lg:text-9xl whitespace-nowrap">
                        Feel Lighter Today.
                    </h1>
                </motion.div>
            </motion.div>

            {/* Media Container (BEHIND the text — z-10) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-[95%] max-w-6xl mx-auto aspect-video bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl flex items-center justify-center group"
            >
                <span className="text-gray-400/60 font-medium text-lg tracking-widest select-none uppercase">
                    Video Placeholder
                </span>

                {/* Floating CTA Buttons */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-4 z-30 w-full max-w-md justify-center px-4">
                    <button
                        onClick={onStartSurvey}
                        className="bg-[#edc5c4] text-gray-900 px-10 py-4 md:py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-sm md:text-base"
                    >
                        나만의 블렌드 찾기
                    </button>
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
