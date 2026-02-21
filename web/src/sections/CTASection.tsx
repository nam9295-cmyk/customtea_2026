import React from 'react';

/**
 * 하단 Call to Action 섹션
 * - 회원가입, 테스트 시작 등 최종 행동 유도
 */
export const CTASection: React.FC = () => {
    return (
        <section className="bg-orange-50 py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                    지금 바로 시작해보세요
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    3분이면 충분합니다. 나만의 취향을 찾아 떠나는 여정을 시작하세요. (CTASection)
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
                        무료 취향 테스트 시작하기
                    </button>
                    <button className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-colors">
                        샘플 패키지 구경하기
                    </button>
                </div>
            </div>
        </section>
    );
};
