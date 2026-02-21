import React from 'react';

/**
 * 기본 베이스 및 원재료 소개 섹션
 * - 베이스 티 종류 (녹차, 홍차 등)
 * - 추가 토핑/향료 소개
 */
export const TeaBaseSection: React.FC = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">다양한 베이스가 준비되어 있어요</h2>
                    <p className="text-gray-600">최고급 원료로 만든 베이스들을 만나보세요. (TeaBaseSection)</p>
                </div>

                {/* Placeholder for Tea Bases grid */}
                <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {['녹차', '홍차', '우롱차', '허브티'].map((base, idx) => (
                        <div key={idx} className="aspect-square bg-gray-100 rounded-2xl flex flex-col items-center justify-center p-6 border border-gray-100 hover:border-gray-300 transition-colors">
                            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                            <h3 className="font-medium text-lg">{base} 베이스</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
