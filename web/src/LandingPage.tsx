import React, { useState, useEffect } from 'react';
import { navLinks } from './data/landingData';
import { teaDetails, TeaDetail } from './data/teaDetails';
import TeaPreviewCard from './components/TeaPreviewCard';

interface LandingPageProps {
  onStartSurvey: () => void;
  onSelectTea: (tea: TeaDetail) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartSurvey, onSelectTea }) => {
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPreviewIndex(prev => (prev + 1) % teaDetails.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent/30 selection:text-white animate-fade-in relative">

      {/* Navigation Bar */}
      <nav className="w-full h-[90px] border-b border-brand-text/5 px-6 md:px-[120px] flex items-center justify-between bg-brand-bg/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex items-center justify-center rounded-sm bg-brand-accent group-hover:bg-[#e4b5b4] transition-colors">
            <span className="font-serif text-white text-lg italic">D</span>
          </div>
          <span className="font-serif text-2xl font-semibold tracking-[0.1em] text-brand-text uppercase">
            Detox Tea
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12 font-medium tracking-wide text-[15px]">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-brand-text/70 hover:text-brand-accent transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>

        <button
          onClick={onStartSurvey}
          className="bg-brand-text text-brand-bg px-8 py-3 rounded-sm text-sm font-semibold hover:bg-brand-text/80 transition-colors duration-300 shadow-sm"
        >
          시작하기
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col w-full">

        {/* Hero Section */}
        <section className="w-full relative min-h-[90vh] flex flex-col justify-center px-6 md:px-[120px] py-[100px] md:py-[180px]">
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[80px] items-center z-10">

            {/* Hero Text */}
            <div className="flex flex-col gap-8 md:gap-12 w-full max-w-[600px]">
              <div className="flex flex-col gap-6">
                <span className="text-brand-accent text-sm font-sans font-semibold tracking-[0.2em] uppercase">
                  Personalized Tea Curation
                </span>
                <h1 className="font-serif text-[48px] md:text-[68px] lg:text-[76px] font-medium leading-[1.1] text-brand-text break-keep tracking-tight">
                  당신만의 완벽한 휴식,<br className="hidden sm:block" />
                  한 잔의 차에서 시작됩니다.
                </h1>
                <p className="text-brand-text/70 text-lg md:text-xl leading-[1.8] font-light break-keep mt-2">
                  취향과 라이프스타일 데이터에 기반한 정교한 분석으로<br className="hidden sm:block" />일상의 균형을 되찾아주는 프리미엄 디톡스 솔루션을 제안합니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <button
                  onClick={onStartSurvey}
                  className="bg-brand-accent text-brand-text px-10 py-5 rounded-sm text-[16px] font-medium hover:bg-[#e4b5b4] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  나만의 블렌드 찾기
                </button>
                <button className="border border-brand-text/20 text-brand-text px-10 py-5 rounded-sm text-[16px] font-medium hover:border-brand-accent hover:text-brand-accent transition-colors duration-300">
                  브랜드 스토리
                </button>
              </div>
            </div>

            {/* Hero Preview Viewer */}
            <div className="w-full flex justify-center lg:justify-end">
              {/* Dot indicators & Viewer Container */}
              <div className="w-full max-w-[480px] lg:max-w-[540px] flex flex-col gap-6 relative">

                {/* Decorative glowing backdrop that pulses slightly */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-brand-accent/20 blur-[60px] rounded-full animate-pulse z-0 pointer-events-none"></div>

                <div className="relative w-full z-10">
                  {teaDetails.map((tea, idx) => {
                    const isActive = idx === currentPreviewIndex;
                    return (
                      <div
                        key={tea.id}
                        className={`absolute inset-0 transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom ${isActive
                          ? 'opacity-100 z-10 scale-100 translate-y-0 blur-none'
                          : 'opacity-0 z-0 scale-[0.92] translate-y-8 blur-[4px]'
                          }`}
                        style={{ position: idx === 0 ? 'relative' : 'absolute' }}
                      >
                        <TeaPreviewCard tea={tea} compact={true} />
                      </div>
                    );
                  })}
                </div>
                {/* Dot indicators */}
                <div className="flex justify-center gap-2.5 pt-2 z-10">
                  {teaDetails.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPreviewIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-700 ease-out ${idx === currentPreviewIndex
                        ? 'bg-brand-accent w-8'
                        : 'bg-brand-text/15 hover:bg-brand-text/30 w-1.5'
                        }`}
                      aria-label={`View ${teaDetails[idx].name}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Signature Base Section */}
        <section className="w-full px-6 md:px-[120px] py-24 bg-brand-text/[0.02]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16 space-y-4 animate-fade-in">
              <span className="font-sans text-xs tracking-[0.2em] text-brand-text/40 font-bold uppercase">
                Discover The Roots
              </span>
              <h2 className="font-serif text-[32px] md:text-[40px] text-brand-text font-medium">
                Our Signature Base
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {teaDetails.map((tea, index) => (
                <div
                  key={tea.id}
                  onClick={() => onSelectTea(tea)}
                  className="group cursor-pointer flex flex-col space-y-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="group relative aspect-square overflow-hidden bg-gray-50 w-full rounded-sm shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl border border-brand-text/5">
                    <img
                      src={tea.imageDefault}
                      alt={`${tea.name} cup`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                    />
                    <img
                      src={tea.imageHover}
                      alt={`${tea.name} package`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay pointer-events-none z-10"></div>

                    {/* Hover Overlay Title */}
                    <div className="absolute inset-0 bg-brand-text/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
                      <span className="font-sans text-white text-sm font-bold tracking-widest uppercase border-b border-white/50 pb-1">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="text-center pt-2">
                    <h3 className="font-serif text-[22px] font-medium text-brand-text mb-1">
                      {tea.name}
                    </h3>
                    <p className="font-sans text-[11px] text-brand-accent tracking-widest uppercase font-semibold">
                      {tea.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full text-brand-text/50 bg-white px-6 md:px-[120px] py-[80px] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-brand-text/5">
        <div className="flex flex-col gap-4">
          <span className="font-serif text-2xl font-semibold tracking-widest text-brand-text uppercase">Detox Tea</span>
          <p className="text-[14px] text-brand-text/50 font-light max-w-[300px] break-keep">
            Premium Personalized Tea Blending Service. Find your balance today.
          </p>
        </div>
        <div className="flex flex-col items-end gap-6 text-[13px] font-medium tracking-wide font-sans">
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-accent transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-brand-accent transition-colors">CONTACT</a>
            <a href="#" className="hover:text-brand-accent transition-colors">LEGAL</a>
          </div>
          <span className="font-light">© {new Date().getFullYear()} Detox Tea. All rights reserved.</span>
        </div>
      </footer>


    </div>
  );
};

export default LandingPage;
