import React, { useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { TeaDetail } from '../data/teaDetails';

interface TeaDetailModalProps {
    tea: TeaDetail;
    onClose: () => void;
}

const TeaDetailModal: React.FC<TeaDetailModalProps> = ({ tea, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[9999] bg-[#FDFCFB]/70 backdrop-blur-md overflow-y-auto animate-fade-in"
            onClick={onClose}
        >
            {/* py-8 ensures top padding is always visible; items-start avoids clip */}
            <div className="flex items-start justify-center min-h-full py-10 px-4">
                <div
                    className="relative w-full max-w-[720px] rounded-[28px] bg-white/95 border border-white/60 shadow-2xl animate-slide-up"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-50 text-xl leading-none"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>

                    {/* Top: Image + Chart side by side */}
                    <div className="grid grid-cols-2 gap-4 p-6 items-center">
                        <div>
                            <img
                                src={tea.popImage}
                                alt={tea.name}
                                className="w-full h-[220px] rounded-xl object-contain"
                            />
                        </div>
                        <div className="h-[220px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={tea.radarData} startAngle={90} endAngle={-270}>
                                    <PolarGrid stroke="#d0d0d0" strokeWidth={1} gridType="polygon" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: '#666', fontSize: 9, fontWeight: 500 }}
                                        tickLine={false}
                                    />
                                    <Radar
                                        name="Benefits"
                                        dataKey="A"
                                        stroke={tea.chartColor}
                                        fill={tea.chartColor}
                                        fillOpacity={0.7}
                                        strokeWidth={2}
                                        isAnimationActive={true}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bottom: Text + Icons */}
                    <div className="px-6 pb-7 pt-5 border-t border-gray-100 bg-[#fafafa]/80 rounded-b-[28px]">
                        <h2 className="font-serif text-[24px] font-bold mb-0.5 text-brand-text">{tea.name}</h2>
                        <p className="font-sans text-[12px] text-brand-accent tracking-widest uppercase mb-3 font-semibold">{tea.subtitle}</p>
                        <p className="font-sans text-[13px] leading-[1.75] text-brand-text/75 mb-6 font-light">
                            {tea.description}
                        </p>

                        <div className="grid grid-cols-4 gap-3">
                            {tea.features.map((feature, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 text-center">
                                    <img
                                        src={feature.src}
                                        alt={feature.label.replace('\n', ' ')}
                                        className="w-10 h-10 object-contain"
                                    />
                                    <span className="font-sans text-[11px] text-brand-text/65 leading-[1.3] font-medium whitespace-pre-line">
                                        {feature.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TeaDetailModal;
