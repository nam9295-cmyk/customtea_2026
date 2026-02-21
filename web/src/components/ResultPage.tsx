import React, { useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Shield, Leaf, Wind, Activity } from 'lucide-react';
import { BlendResult } from '../engine/calculator';
import { teaDetails } from '../data/teaDetails';

interface ResultPageProps {
    onRestart: () => void;
    blendResult: BlendResult[];
}

const radarData = [
    { subject: '활력', A: 85, fullMark: 100 },
    { subject: '이완', A: 65, fullMark: 100 },
    { subject: '면역', A: 90, fullMark: 100 },
    { subject: '소화/해독', A: 75, fullMark: 100 },
    { subject: '호흡기', A: 60, fullMark: 100 },
];

const benefits = [
    { icon: Shield, label: '간 해독 지원' },
    { icon: Leaf, label: '소화 기능 개선' },
    { icon: Wind, label: '붓기 완화' },
    { icon: Activity, label: '활력 충전' },
];

const ResultPage: React.FC<ResultPageProps> = ({ onRestart, blendResult }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const topTea = blendResult[0];
    const topTeaDetail = teaDetails.find((tea) => tea.id === topTea.id);
    const recommendedImage = topTeaDetail?.imageHover ?? '/images/british.webp';

    return (
        <div className="fixed inset-0 z-[200] w-full min-h-screen bg-[#FDFCFB] overflow-y-auto py-20 px-6 md:px-20 animate-fade-in">
            <div className="max-w-5xl mx-auto flex flex-col items-center">

                {/* Header */}
                <div className="w-full text-center space-y-4 mb-16 md:mb-24 mt-8 md:mt-12">
                    <p className="font-sans text-[11px] md:text-xs font-bold tracking-[0.2em] text-brand-text/40 uppercase">
                        Curation Report No. 2026-001
                    </p>
                    <h1 className="font-serif text-[32px] md:text-[48px] font-medium text-brand-text leading-[1.3] break-keep">
                        John 님을 위한<br className="md:hidden" /> 완벽한 블렌딩 결과입니다.
                    </h1>
                </div>

                {/* Grid Area: 1:1 ratio for Image and Chart */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">

                    {/* Left: Product Visual */}
                    <div className="flex flex-col space-y-6 md:space-y-8">
                        <div className="w-full aspect-square bg-[#faf7f5] rounded-[24px] md:rounded-[32px] overflow-hidden relative shadow-sm">
                            <img
                                src={recommendedImage}
                                alt="Recommended Tea Blend"
                                loading="eager"
                                decoding="async"
                                className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay"></div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="font-serif text-[26px] md:text-[32px] font-medium text-brand-text mb-2 leading-[1.3] break-keep">
                                {topTea.name} /<br className="hidden md:block" /> with Signature Botanicals
                            </h2>
                            <p className="font-sans text-[13px] md:text-[14px] text-brand-accent tracking-[0.2em] uppercase font-bold mt-3">
                                Main Base
                            </p>
                        </div>
                    </div>

                    {/* Right: Radar Chart */}
                    <div className="w-full aspect-square flex flex-col justify-center items-center bg-white border border-brand-text/5 rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm relative overflow-hidden">
                        <h3 className="absolute top-8 left-8 font-sans text-[12px] md:text-sm font-bold tracking-widest text-brand-text/40 uppercase">
                            Balance Analysis
                        </h3>
                        <div className="w-full h-full max-h-[400px] mt-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                                    <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: '#4a4a4a', fontSize: 13, fontWeight: 600, fontFamily: 'sans-serif' }}
                                    />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="John"
                                        dataKey="A"
                                        stroke="#edc5c4"
                                        strokeWidth={2}
                                        fill="#edc5c4"
                                        fillOpacity={0.4}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

                {/* AI Analysis & Blend Ratio */}
                <div className="w-full text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 mb-20 md:mb-28">

                    <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                        <h3 className="font-sans text-[12px] md:text-sm font-bold tracking-widest text-brand-text/40 uppercase border-b border-brand-text/10 pb-4 inline-block md:block self-center md:self-start">
                            AI Curation Note
                        </h3>
                        <p className="font-sans text-[16px] md:text-[18px] font-light text-brand-text/80 leading-[1.8] break-keep">
                            설문 결과를 바탕으로 분석한 맞춤형 추천 이유입니다. 고객님이 주로 차를 찾으시는 나른한 오후와 저녁 시간에 어울리도록, 상큼한 과일향과 시원한 허브향을 베이스로 한 면역력 강화 블렌딩을 추천해 드립니다.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                        <h3 className="font-sans text-[12px] md:text-sm font-bold tracking-widest text-brand-text/40 uppercase border-b border-brand-text/10 pb-4 inline-block md:block self-center md:self-start">
                            Blend Ratios
                        </h3>
                        <div className="space-y-5 w-full">
                            {blendResult.filter(ratio => ratio.ratio > 0).map((ratio, index) => (
                                <div key={index} className="flex flex-col space-y-2">
                                    <div className="flex justify-between font-sans text-[14px] md:text-[15px] font-medium text-brand-text">
                                        <span className={`font-semibold ${index === 0 ? 'text-brand-text' : 'text-brand-text/70'}`}>
                                            {ratio.name} {index === 0 ? '(Base)' : ''}
                                        </span>
                                        <span className="text-brand-accent">{ratio.ratio}%</span>
                                    </div>
                                    <div className="w-full h-[4px] bg-brand-text/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-in-out ${index === 0 ? 'bg-brand-accent' : 'bg-brand-accent/50'}`}
                                            style={{ width: `${ratio.ratio}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Benefits Icons */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div key={index} className="flex flex-col items-center justify-center space-y-4 md:space-y-5 p-6 md:p-8 bg-white border border-brand-text/5 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[24px]">
                                <Icon size={32} strokeWidth={1.5} className="text-brand-accent" />
                                <span className="font-sans text-[13px] md:text-[15px] font-semibold tracking-wide text-brand-text break-keep text-center">
                                    {benefit.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col w-full md:w-auto md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <button className="w-full md:w-auto px-10 md:px-14 py-4 md:py-5 bg-brand-accent text-[#FDFCFB] font-sans text-[15px] font-bold tracking-wide rounded-full hover:-translate-y-1 shadow-md hover:shadow-lg transition-all duration-300">
                        이 블렌딩으로 주문하기
                    </button>
                    <button
                        onClick={onRestart}
                        className="w-full md:w-auto px-10 md:px-14 py-4 md:py-5 bg-transparent text-brand-text font-sans text-[15px] font-bold tracking-wide rounded-full border border-brand-text hover:bg-brand-text/5 transition-colors duration-300"
                    >
                        테스트 다시 하기
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ResultPage;
