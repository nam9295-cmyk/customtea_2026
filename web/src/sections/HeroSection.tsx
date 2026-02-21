import React from 'react';

/**
 * 랜딩 페이지 기본 상단 섹션
 * - 핵심 메시지 전달
 * - 서비스 시작하기 유도 (CTA)
 */
export const HeroSection: React.FC = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
                    커스텀 티를 만나는 가장 쉬운 방법
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    당신만의 취향을 담은 특별한 블렌딩 티를 경험해보세요. (HeroSection)
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
                    내 취향 테스트하기
                </button>
            </div>
        </section>
    );
};
