import React from 'react';

/**
 * 브랜드 미션 및 철학 소개 섹션
 * - 신뢰감 형성
 * - 왜 이 서비스를 만들었는지
 */
export const MissionSection: React.FC = () => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4">
                <div className="bg-gray-900 rounded-[2rem] p-12 md:p-20 text-center max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        우리의 차는 특별합니다
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        모든 사람이 각자의 삶의 방식과 취향을 가지고 있듯,
                        차를 즐기는 방식도 모두 달라야 한다고 믿습니다.
                        당신에게 완벽하게 맞춰진 한 잔의 차를 위해. (MissionSection)
                    </p>
                </div>
            </div>
        </section>
    );
};
