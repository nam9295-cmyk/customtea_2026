import React, { useCallback, useMemo, useState } from 'react';
import { questions } from '../data/questions';

export type AnswerValue = string | string[];

interface QuestionFormProps {
    onClose: () => void;
    onComplete: (answers: Record<string, AnswerValue>) => void;
}

type MiniAxisKey = 'refreshing' | 'classic' | 'dessertLike' | 'balanced';

const optionSignalHint: Record<string, string> = {
    refreshing: '상쾌함 선호가 반영됩니다.',
    classic: '클래식 성향이 반영됩니다.',
    balanced: '균형감 선호가 반영됩니다.',
    desserty: '디저트형 풍미 선호가 반영됩니다.',
    adventurous: '새로운 스타일 탐색 성향이 반영됩니다.',
    bold: '강한 개성 선호가 반영됩니다.',
    ritual: '차분한 루틴 성향이 반영됩니다.',
    casual: '가볍게 즐기는 성향이 반영됩니다.',
};

const miniAxisConfig: Record<MiniAxisKey, { label: string }> = {
    refreshing: { label: '상쾌함' },
    classic: { label: '클래식함' },
    dessertLike: { label: '디저트감' },
    balanced: { label: '균형감' },
};

const QuestionForm: React.FC<QuestionFormProps> = ({ onClose, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});

    const currentQuestion = questions[currentStep];
    const isLastStep = currentStep === questions.length - 1;

    // Check if the current question is answered.
    // For single choice, it must be defined.
    // For multiple choice, it must be an array with length > 0.
    const currentAnswer = answers[currentQuestion.id];
    const isAnswered = currentAnswer !== undefined && (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);

    const getOptionHint = useCallback((optionValue: string) => {
        const option = currentQuestion.options.find((item) => item.value === optionValue);
        if (!option) return '현재 질문의 취향 분석에 반영됩니다.';

        const strongestSignal = Object.entries(option.profileSignals)
            .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0) || a[0].localeCompare(b[0]))[0]?.[0];

        return strongestSignal
            ? optionSignalHint[strongestSignal] || '현재 질문의 취향 분석에 반영됩니다.'
            : '현재 질문의 취향 분석에 반영됩니다.';
    }, [currentQuestion.options]);

    const miniAxisScores = useMemo(() => {
        const raw: Record<MiniAxisKey, number> = {
            refreshing: 0,
            classic: 0,
            dessertLike: 0,
            balanced: 0,
        };

        let selectedCount = 0;

        questions.forEach((question) => {
            const value = answers[question.id];
            if (!value) return;

            const values = Array.isArray(value) ? value : [value];
            values.forEach((selected) => {
                const option = question.options.find((item) => item.value === selected);
                if (!option) return;
                selectedCount += 1;

                raw.refreshing += option.profileSignals.refreshing || 0;
                raw.classic += option.profileSignals.classic || 0;
                raw.balanced += option.profileSignals.balanced || 0;
                raw.dessertLike += option.profileSignals.desserty || 0;
            });
        });

        const base = Math.max(1, selectedCount * 2);
        return (Object.keys(raw) as MiniAxisKey[]).reduce<Record<MiniAxisKey, number>>((acc, key) => {
            const percent = Math.max(0, Math.min(100, Math.round((raw[key] / base) * 100)));
            acc[key] = raw[key] > 0 ? Math.max(10, percent) : 0;
            return acc;
        }, {
            refreshing: 0,
            classic: 0,
            dessertLike: 0,
            balanced: 0,
        });
    }, [answers]);

    const handleOptionSelect = useCallback((optionValue: string) => {
        const questionId = currentQuestion.id;
        const questionType = currentQuestion.type;

        setAnswers((prev) => {
            if (questionType === 'multiple') {
                const currentList = (prev[questionId] as string[]) || [];
                const nextList = currentList.includes(optionValue)
                    ? currentList.filter((v) => v !== optionValue)
                    : [...currentList, optionValue];

                return { ...prev, [questionId]: nextList };
            }

            return { ...prev, [questionId]: optionValue };
        });
    }, [currentQuestion.id, currentQuestion.type]);

    const handleNext = useCallback(() => {
        if (isLastStep) {
            onComplete(answers);
        } else {
            setCurrentStep((s) => s + 1);
        }
    }, [answers, isLastStep, onComplete]);

    const handlePrev = useCallback(() => {
        setCurrentStep((s) => Math.max(0, s - 1));
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-[#FDFCFB]/60 backdrop-blur-md flex justify-center items-start pt-16 md:pt-24 pb-16 px-4 animate-fade-in overflow-y-auto">
            {/* Close Button - Fixed to viewport */}
            <button
                onClick={onClose}
                className="fixed top-6 right-6 md:top-8 md:right-8 w-10 h-10 flex items-center justify-center text-brand-text/50 hover:text-brand-text transition-colors z-[110]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Floating Form Container */}
            <div className="bg-white/95 border border-white/50 shadow-2xl rounded-[24px] md:rounded-[32px] w-full max-w-[800px] flex flex-col animate-slide-up overflow-hidden p-6 md:p-12 mb-10 relative">

                {/* Progress Bar Container */}
                <div className="w-full mb-10 md:mb-14">
                    <div className="flex justify-between text-[11px] font-sans font-bold tracking-[0.15em] text-brand-text/40 mb-3">
                        <span>STEP {currentStep + 1}</span>
                        <span>{questions.length}</span>
                    </div>
                    <div className="w-full h-[2px] bg-brand-text/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand-accent transition-all duration-700 ease-in-out"
                            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        />
                    </div>

                    <div className="mt-4 rounded-xl border border-brand-text/10 bg-[#fcf8f6] px-4 py-3">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] text-brand-text/45 uppercase mb-2">
                            분석 진행 상태
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {(Object.keys(miniAxisConfig) as MiniAxisKey[]).map((axisKey) => (
                                <div key={axisKey} className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] md:text-[12px] font-sans text-brand-text/65">
                                        <span>{miniAxisConfig[axisKey].label}</span>
                                        <span>{miniAxisScores[axisKey]}%</span>
                                    </div>
                                    <div className="h-[3px] rounded-full bg-brand-text/10 overflow-hidden">
                                        <div
                                            className="h-full bg-brand-accent/70 transition-all duration-500"
                                            style={{ width: `${miniAxisScores[axisKey]}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Question Content */}
                <div className="flex-1 w-full flex flex-col">
                    {/* Animated Question Text Container */}
                    <div
                        key={currentStep} // Triggers re-render for animation on step change
                        className="animate-fade-in"
                    >
                        <h3 className="font-serif text-[28px] md:text-[36px] font-medium text-brand-text leading-[1.3] mb-2 break-keep">
                            {currentQuestion.title}
                        </h3>
                        {currentQuestion.subtitle && (
                            <p className="font-sans text-[15px] font-medium text-brand-text/50 mb-8 md:mb-10 text-left">
                                {currentQuestion.subtitle}
                            </p>
                        )}
                        {!currentQuestion.subtitle && <div className="mb-8 md:mb-12" />}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentQuestion.options.map((option) => {
                                const isSelected = currentQuestion.type === 'multiple'
                                    ? ((answers[currentQuestion.id] as string[]) || []).includes(option.value)
                                    : answers[currentQuestion.id] === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => handleOptionSelect(option.value)}
                                        className={`
                                            relative w-full p-6 md:p-8 text-left rounded-xl border transition-all duration-300 group overflow-hidden
                                            ${isSelected
                                                ? 'border-brand-accent bg-[#fcf3f2] shadow-sm'
                                                : 'border-brand-text/10 bg-white hover:border-brand-accent/50 hover:bg-[#faf7f5]'
                                            }
                                        `}
                                    >
                                        {/* Selected Indicator Circle or Checkbox */}
                                        <div className={`
                                            absolute top-6 right-6 flex items-center justify-center transition-all duration-300
                                            ${currentQuestion.type === 'multiple' ? 'w-5 h-5 rounded-[6px]' : 'w-3 h-3 rounded-full'}
                                            ${isSelected ? 'border-brand-accent bg-brand-accent text-white' : 'border border-brand-text/20 group-hover:border-brand-accent/40 bg-transparent'}
                                        `}>
                                            {currentQuestion.type === 'multiple' && isSelected && (
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>

                                        <h4 className={`
                                            font-sans text-[16px] md:text-[18px] font-medium transition-colors duration-300
                                            ${isSelected ? 'text-brand-accent' : 'text-brand-text'}
                                        `}>
                                            {option.label}
                                        </h4>
                                        <p className={`
                                            mt-2 font-sans text-[12px] md:text-[13px] leading-relaxed transition-colors duration-300
                                            ${isSelected ? 'text-brand-accent/80' : 'text-brand-text/45'}
                                        `}>
                                            {getOptionHint(option.value)}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-12 md:mt-16 pt-8 border-t border-brand-text/5">
                        <button
                            onClick={handlePrev}
                            className={`font-sans text-[14px] font-medium tracking-wide transition-colors ${currentStep === 0 ? 'text-transparent pointer-events-none' : 'text-brand-text/60 hover:text-brand-text'}`}
                        >
                            이전
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!isAnswered}
                            className={`
                                font-sans text-[15px] font-semibold px-8 py-3.5 rounded-full tracking-wide transition-all duration-300 shadow-sm
                                ${isAnswered
                                    ? 'bg-brand-accent text-[#FDFCFB] hover:bg-[#e4b5b4] hover:-translate-y-0.5 hover:shadow-md'
                                    : 'bg-brand-text/5 text-brand-text/30 cursor-not-allowed'
                                }
                            `}
                        >
                            {isLastStep ? '결과 확인하기' : '다음'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;
