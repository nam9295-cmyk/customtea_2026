import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroLoaderProps {
    onLoadingComplete: () => void;
}

export function IntroLoader({ onLoadingComplete }: IntroLoaderProps) {
    useEffect(() => {
        const completeTimer = setTimeout(() => {
            onLoadingComplete();
        }, 3000);

        return () => {
            clearTimeout(completeTimer);
        };
    }, [onLoadingComplete]);

    const lines = [
        "당신만의 완벽한 휴식,",
        "한 잔의 차에서 시작됩니다."
    ];

    const containerVariants = {
        initial: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Slightly slower stagger
                delayChildren: 0.5,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 1.5, // Match exactly with background slide duration
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
            },
        },
    };

    const wordVariants = {
        initial: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2, // Slower text reveal
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
        },
    };

    const backgroundVariants = {
        initial: { y: "0%" },
        exit: {
            y: "-100%",
            transition: {
                duration: 1.5, // Much slower exit transition
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            }
        }
    };

    const logoVariants = {
        initial: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                // 👇 이 숫자를 조절해서 로고가 나타나는 타이밍(초 단위)을 변경할 수 있습니다.
                // 현재 1.5초로 설정되어 있습니다.
                delay: 1.5,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
        },
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
            initial="initial"
            animate="visible"
            exit="exit"
        >
            {/* Background Layer */}
            <motion.div
                className="absolute inset-0 bg-[#edc5c4] -z-10"
                variants={backgroundVariants}
            />

            {/* Text Layer */}
            <motion.div
                className="relative flex flex-col items-center gap-4 px-6 text-center z-10"
                variants={containerVariants}
            >
                {lines.map((line, lineIndex) => (
                    <div key={lineIndex} className="flex flex-wrap justify-center gap-[0.3em]">
                        {line.split(" ").map((word, wordIndex) => (
                            <motion.span
                                key={`${lineIndex}-${wordIndex}`}
                                variants={wordVariants}
                                className="inline-block font-serif text-[28px] md:text-[40px] lg:text-[52px] font-medium text-brand-bg tracking-wide"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                ))}
            </motion.div>

            {/* Shared Element Logo Layer */}
            <motion.div
                className="relative mt-16 z-20"
                variants={logoVariants}
            >
                <motion.img
                    src="/images/logo.png"
                    layoutId="main-logo"
                    alt="Custom Tea Logo"
                    className="w-40 md:w-56 object-contain"
                />
            </motion.div>
        </motion.div>
    );
}
