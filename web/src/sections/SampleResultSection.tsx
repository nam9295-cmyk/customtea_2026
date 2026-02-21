import React from 'react';

/**
 * 샘플 결과물 및 추천 조합 소개 섹션
 * - 다른 고객들의 조합 예시
 * - 베스트 조합 추천
 */
export const SampleResultSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 flex justify-between items-end max-w-6xl mx-auto">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">인기 추천 조합</h2>
                        <p className="text-gray-600">어떤 조합이 좋을지 고민된다면 추천 메뉴를 확인해보세요. (SampleResultSection)</p>
                    </div>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-900 hidden md:block">
                        모든 추천 보기 →
                    </button>
                </div>

                {/* Placeholder for Sample Results carousel/grid */}
                <div className="flex gap-6 overflow-x-auto pb-4 max-w-6xl mx-auto snap-x">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="min-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm flex-shrink-0 snap-start">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-6">
                                <span className="text-xs font-semibold text-orange-600 mb-2 block">릴렉스</span>
                                <h3 className="font-bold text-xl mb-1">캐모마일 & 피치 블렌드</h3>
                                <p className="text-gray-500 text-sm">잠들기 전 마시기 좋은 달콤한 조합</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
