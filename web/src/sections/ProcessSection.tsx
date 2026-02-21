import React from 'react';

/**
 * 서비스 이용 과정 섹션
 * - كيف 작동하는지 3-4단계로 설명
 */
export const ProcessSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">어떻게 만드나요?</h2>
                    <p className="text-gray-600">간단한 3단계로 나만의 커스텀 티가 완성됩니다. (ProcessSection)</p>
                </div>

                {/* Placeholder for Process Steps (ex: 취향 테스트 -> 베이스/토핑 선택 -> 배송) */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-gray-400">
                                {step}
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Step {step}</h3>
                            <p className="text-gray-500 text-sm">과정에 대한 설명이 여기에 들어갑니다.</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
