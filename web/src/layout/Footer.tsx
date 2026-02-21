import React from 'react';

/**
 * 웹사이트 하단 푸터
 * - 회사 정보, 고객센터, 링크 목록
 */
export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between mb-8 gap-8">
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">Custom Tea</h3>
                        <p className="text-sm">당신만의 취향을 블렌딩합니다. (Footer)</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                        <div>
                            <h4 className="text-white font-semibold mb-4">서비스</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">취향 테스트</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">티 리스트</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">고객지원</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2026 Custom Tea. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors">이용약관</a>
                        <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
