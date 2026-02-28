import React, { useEffect, useMemo } from 'react';
import { RecommendationResult } from '../engine/calculator';
import { PreferenceSignalKey } from '../engine/profileAnalyzer';
import { TeaId } from '../data/questions';
import { teaDetails } from '../data/teaDetails';
import { getAnswerLabels, teaRecommendationContent } from '../data/recommendationContent';

interface ResultPageProps {
    onRestart: () => void;
    recommendationResult: RecommendationResult;
    answers: Record<string, string | string[]>;
}

const axisOrder = ['mood', 'aroma', 'timing', 'situation', 'temperature', 'caffeine', 'style', 'intensity', 'finish'] as const;

const signalLabelMap: Record<PreferenceSignalKey, string> = {
    refreshing: '리프레시 성향',
    classic: '클래식 선호',
    adventurous: '탐색 성향',
    dessertLike: '디저트감 선호',
    balanced: '균형감 선호',
    softExotic: '소프트 이국성 선호',
    fruity: '프루티 선호',
    minty: '민티 선호',
    blackTeaForward: '홍차 중심 선호',
    icedFriendly: '아이스 친화 성향',
    afterMeal: '식후 적합 성향',
    calmFocus: '차분한 집중 성향',
};

const lowPriorityDirectionMap: Record<PreferenceSignalKey, string> = {
    refreshing: '강한 리프레시 결보다는 안정적인 바디감을 우선하는 흐름입니다.',
    classic: '전통적인 클래식 무드보다 변주 있는 스타일을 더 열어두는 편입니다.',
    adventurous: '새로운 변주보다 익숙하고 안정적인 스타일이 더 편안한 흐름입니다.',
    dessertLike: '디저트감이 진한 스타일보다 깔끔한 마무리를 더 선호하는 편입니다.',
    balanced: '중간 균형보다는 선명한 개성을 가진 방향에 더 반응하는 편입니다.',
    softExotic: '은은한 이국성보다는 익숙하고 직관적인 향미를 우선합니다.',
    fruity: '프루티 중심보다는 구조감 있는 결을 더 우선하는 흐름입니다.',
    minty: '민트의 쿨한 대비보다 부드러운 톤을 더 편안하게 느끼는 편입니다.',
    blackTeaForward: '홍차 중심 구조감보다는 가벼운 결의 향미를 더 선호하는 편입니다.',
    icedFriendly: '아이스 중심보다는 따뜻한 온도에서의 레이어를 더 선호합니다.',
    afterMeal: '식후 중심보다 루틴형 티 타임에서 만족도가 높은 편입니다.',
    calmFocus: '몰입형 무드보다 환기형 무드에서 더 빠르게 반응하는 편입니다.',
};

const teaSignalFit: Record<TeaId, PreferenceSignalKey[]> = {
    britishBlack: ['classic', 'blackTeaForward', 'calmFocus', 'dessertLike'],
    asianGold: ['balanced', 'softExotic', 'calmFocus', 'afterMeal'],
    hibiscusFruit: ['refreshing', 'fruity', 'icedFriendly', 'afterMeal'],
    mintyChocolat: ['minty', 'dessertLike', 'afterMeal', 'refreshing'],
};

const ResultPage: React.FC<ResultPageProps> = ({ onRestart, recommendationResult, answers }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sorted = useMemo(
        () => [...recommendationResult.teaScores].sort((a, b) => b.ratio - a.ratio || b.adjustedScore - a.adjustedScore || a.id.localeCompare(b.id)),
        [recommendationResult.teaScores],
    );

    const primary = sorted[0];
    const secondary = sorted[1];
    const primaryContent = teaRecommendationContent[primary.id];
    const secondaryContent = secondary ? teaRecommendationContent[secondary.id] : null;
    const answerLabels = useMemo(() => getAnswerLabels(answers), [answers]);
    const primaryImage = teaDetails.find((tea) => tea.id === primary.id)?.imageHover ?? '/images/british.webp';
    const axisReasons = axisOrder
        .filter((axis) => answerLabels[axis]?.length)
        .slice(0, 4)
        .map((axis) => primaryContent.axisReasons[axis])
        .filter((reason): reason is string => Boolean(reason));

    const topSignals = recommendationResult.explanationSignals.slice(0, 3);
    const profileSignalSummary = topSignals
        .map((signal) => signalLabelMap[signal.key])
        .join(' · ');
    const archetypeTraits = recommendationResult.archetype.representativeTraits.slice(0, 3).join(' · ');

    const diagnosisSummary = [
        answerLabels.mood?.[0],
        answerLabels.style?.[0],
        answerLabels.intensity?.[0],
    ]
        .filter((item): item is string => Boolean(item))
        .slice(0, 2)
        .join(' + ');

    const recommendationReasons = [
        axisReasons[0],
        axisReasons[1],
        topSignals[0]
            ? `${signalLabelMap[topSignals[0].key]} 신호가 높게 나타나 ${primaryContent.title}의 방향성과 안정적으로 맞아떨어졌습니다.`
            : undefined,
    ].filter((reason): reason is string => Boolean(reason)).slice(0, 3);

    while (recommendationReasons.length < 3) {
        recommendationReasons.push(primaryContent.coreDescription);
    }

    const secondaryFitSignal = secondary
        ? topSignals.find((signal) => teaSignalFit[secondary.id].includes(signal.key))
        : undefined;
    const scoreGap = secondary ? Math.abs(primary.ratio - secondary.ratio) : 0;
    const secondaryReason = secondary
        ? scoreGap <= 10
            ? `메인 추천과 점수 차이가 크지 않아, 상황 전환 시 ${secondaryContent?.title}도 높은 적합도를 보입니다.${secondaryFitSignal ? ` 특히 ${signalLabelMap[secondaryFitSignal.key]} 신호와 연결됩니다.` : ''}`
            : `${secondaryContent?.title}는 메인보다 강도가 약간 다르지만, 다른 시간대나 분위기에서 좋은 대안이 됩니다.${secondaryFitSignal ? ` ${signalLabelMap[secondaryFitSignal.key]} 축에서 보완력이 있습니다.` : ''}`
        : '';

    const lowestSignal = (Object.entries(recommendationResult.profileScores) as Array<[PreferenceSignalKey, number]>)
        .sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]))[0];
    const lowPriorityLine = lowestSignal && lowestSignal[1] <= 44
        ? lowPriorityDirectionMap[lowestSignal[0]]
        : null;

    return (
        <div className="fixed inset-0 z-[200] w-full min-h-screen bg-[#FDFCFB] overflow-y-auto py-16 md:py-20 px-5 md:px-12 animate-fade-in">
            <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
                <header className="text-center space-y-4">
                    <p className="font-sans text-[11px] md:text-xs font-bold tracking-[0.2em] text-brand-text/40 uppercase">
                        Custom Tea Recommendation
                    </p>
                    <h1 className="font-serif text-[30px] md:text-[46px] font-medium text-brand-text leading-[1.3] break-keep">
                        오늘의 취향에 맞춘 티 큐레이션입니다.
                    </h1>
                    <p className="font-sans text-[14px] md:text-[16px] text-brand-text/65 leading-relaxed">
                        건강 효능을 단정하지 않고, 설문에서 고른 취향 축을 바탕으로 풍미와 상황 중심으로 추천해 드립니다.
                    </p>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
                    <div className="lg:col-span-5 rounded-[24px] md:rounded-[30px] border border-brand-text/10 bg-white/90 shadow-sm overflow-hidden">
                        <div className="aspect-square bg-[#f7f2ef] relative">
                            <img
                                src={primaryImage}
                                alt={primaryContent.title}
                                loading="eager"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="p-6 md:p-8">
                            <p className="text-[11px] font-sans tracking-[0.18em] uppercase text-brand-accent font-semibold mb-3">
                                메인 추천 티
                            </p>
                            <h2 className="font-serif text-[32px] md:text-[38px] leading-tight text-brand-text mb-2">
                                {primaryContent.title}
                            </h2>
                            <p className="font-sans text-[13px] uppercase tracking-[0.16em] text-brand-text/45 mb-4">
                                {primaryContent.subtitle}
                            </p>
                            <p className="font-sans text-[15px] md:text-[16px] text-brand-text/75 leading-relaxed">
                                {primaryContent.coreDescription}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-7 rounded-[24px] md:rounded-[30px] border border-brand-text/10 bg-white/95 shadow-sm p-6 md:p-8 space-y-6">
                        <div>
                            <h3 className="font-sans text-[12px] md:text-[13px] font-bold tracking-widest uppercase text-brand-text/45 mb-3">
                                취향 아키타입
                            </h3>
                            <p className="font-sans text-[13px] md:text-[14px] text-brand-text/55 mt-3 leading-relaxed">
                                취향 타입: {recommendationResult.archetype.nameKo} · {recommendationResult.archetype.oneLiner}
                            </p>
                            <p className="font-sans text-[13px] md:text-[14px] text-brand-text/50 mt-1 leading-relaxed">
                                대표 성향: {archetypeTraits}
                            </p>
                            <p className="font-sans text-[13px] md:text-[14px] text-brand-text/50 mt-1 leading-relaxed">
                                잘 맞는 티 방향: {recommendationResult.archetype.teaDirection.note}
                            </p>
                            {profileSignalSummary && (
                                <p className="font-sans text-[13px] md:text-[14px] text-brand-text/50 mt-1 leading-relaxed">
                                    주요 신호: {profileSignalSummary}
                                </p>
                            )}
                        </div>
                        <div>
                            <h3 className="font-sans text-[12px] md:text-[13px] font-bold tracking-widest uppercase text-brand-text/45 mb-3">
                                취향 진단 요약
                            </h3>
                            <p className="font-sans text-[15px] md:text-[16px] text-brand-text/75 leading-relaxed break-keep">
                                {diagnosisSummary
                                    ? `${diagnosisSummary} 선택이 핵심 분기점으로 작동했고, ${profileSignalSummary || '주요 취향 신호'}를 중심으로 ${primaryContent.title}가 가장 높은 적합도로 도출되었습니다.`
                                    : `${profileSignalSummary || '핵심 취향 신호'}를 중심으로 ${primaryContent.title}가 가장 자연스럽게 매칭되었습니다.`}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-sans text-[12px] md:text-[13px] font-bold tracking-widest uppercase text-brand-text/45 mb-3">
                                추천 이유 3가지
                            </h3>
                            <div className="space-y-2.5">
                                {recommendationReasons.map((reason, index) => (
                                    <p key={`${reason}-${index}`} className="font-sans text-[14px] md:text-[15px] text-brand-text/75 leading-relaxed">
                                        {index + 1}. {reason}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
                    <div className="lg:col-span-6 rounded-[24px] border border-brand-text/10 bg-white/95 p-6 md:p-8">
                        <h3 className="font-sans text-[12px] md:text-[13px] font-bold tracking-widest uppercase text-brand-text/45 mb-3">
                            향미 키워드
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {primaryContent.flavorKeywords.map((keyword) => (
                                <span
                                    key={keyword}
                                    className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] md:text-[13px] font-medium bg-[#f8f1ed] text-brand-text/80 border border-brand-text/10"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-6 rounded-[24px] border border-brand-text/10 bg-white/95 p-6 md:p-8">
                        <h3 className="font-sans text-[12px] md:text-[13px] font-bold tracking-widest uppercase text-brand-text/45 mb-3">
                            잘 맞는 시간대/상황
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-2xl bg-[#fcf8f6] border border-brand-text/10 p-4">
                                <h4 className="font-sans text-[11px] font-bold tracking-widest uppercase text-brand-text/45 mb-2">
                                    시간대
                                </h4>
                                <p className="font-sans text-[14px] text-brand-text/75 leading-relaxed">
                                    {primaryContent.timings.join(' · ')}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-[#fcf8f6] border border-brand-text/10 p-4">
                                <h4 className="font-sans text-[11px] font-bold tracking-widest uppercase text-brand-text/45 mb-2">
                                    상황
                                </h4>
                                <p className="font-sans text-[14px] text-brand-text/75 leading-relaxed">
                                    {primaryContent.situations.join(' · ')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
                    <div className="lg:col-span-7 rounded-[24px] border border-brand-text/10 bg-white/95 p-6 md:p-8">
                        <h3 className="font-sans text-[12px] md:text-[13px] font-bold tracking-widest uppercase text-brand-text/45 mb-4">
                            세컨드 추천
                        </h3>
                        {secondary && secondaryContent ? (
                            <>
                                <p className="font-serif text-[28px] md:text-[32px] text-brand-text leading-tight mb-2">
                                    {secondaryContent.title}
                                </p>
                                <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-brand-text/45 mb-4">
                                    {secondaryContent.subtitle}
                                </p>
                                <p className="font-sans text-[15px] text-brand-text/75 leading-relaxed mb-3">
                                    {secondaryContent.coreDescription}
                                </p>
                                <p className="font-sans text-[14px] text-brand-text/60 leading-relaxed">
                                    왜 세컨드 추천인지: {secondaryReason}
                                </p>
                            </>
                        ) : (
                            <p className="font-sans text-[15px] text-brand-text/70 leading-relaxed">
                                이번 결과에서는 메인 추천의 적합도가 높아 세컨드 추천은 생략했습니다.
                            </p>
                        )}
                    </div>

                    <div className="lg:col-span-5 rounded-[24px] border border-brand-text/10 bg-white/95 p-6 md:p-8">
                        <h3 className="font-sans text-[12px] md:text-[13px] font-bold tracking-widest uppercase text-brand-text/45 mb-4">
                            추천 비율
                        </h3>
                        <div className="space-y-4">
                            {sorted.map((item, index) => (
                                <div key={item.id} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-[14px] font-medium text-brand-text">
                                        <span className={index === 0 ? 'font-semibold' : 'text-brand-text/70'}>
                                            {teaRecommendationContent[item.id].title}
                                            {index === 0 ? ' (Main)' : index === 1 ? ' (Second)' : ''}
                                        </span>
                                        <span className="text-brand-accent">{item.ratio}%</span>
                                    </div>
                                    <div className="h-[4px] bg-brand-text/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${index === 0 ? 'bg-brand-accent' : 'bg-brand-accent/45'} transition-all duration-700`}
                                            style={{ width: `${item.ratio}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {lowPriorityLine && (
                            <div className="mt-5 rounded-xl border border-brand-text/10 bg-[#fcf8f6] p-4">
                                <p className="font-sans text-[11px] font-bold tracking-widest uppercase text-brand-text/45 mb-2">
                                    현재 우선순위가 낮은 방향
                                </p>
                                <p className="font-sans text-[14px] text-brand-text/65 leading-relaxed">
                                    {lowPriorityLine}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <footer className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 pt-2">
                    <button className="w-full md:w-auto px-10 py-4 bg-brand-accent text-[#FDFCFB] font-sans text-[15px] font-semibold rounded-full hover:-translate-y-0.5 transition-all duration-300">
                        이 추천으로 제품 보기
                    </button>
                    <button
                        onClick={onRestart}
                        className="w-full md:w-auto px-10 py-4 bg-transparent text-brand-text font-sans text-[15px] font-semibold rounded-full border border-brand-text/25 hover:bg-brand-text/5 transition-colors duration-300"
                    >
                        테스트 다시 하기
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ResultPage;
