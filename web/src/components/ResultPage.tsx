import React, { useEffect, useState } from 'react';

const ResultPage: React.FC = () => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        // Add a slight delay for a smoother entrance
        const timer = setTimeout(() => setShowText(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 animate-fade-in">
            <div className={`flex flex-col items-center gap-10 transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                {/* Subtle spinning animation */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-brand-accent/20 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-brand-accent rounded-full border-t-transparent animate-spin"></div>
                    <span className="font-serif italic text-brand-accent text-lg">D</span>
                </div>

                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="font-serif text-[32px] md:text-[40px] font-medium text-brand-text break-keep tracking-tight">
                        가장 완벽한 비율을<br className="hidden sm:block" />
                        찾고 있습니다...
                    </h2>
                    <p className="text-brand-text/50 font-sans tracking-wide">
                        잠시만 기다려주세요
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ResultPage;
