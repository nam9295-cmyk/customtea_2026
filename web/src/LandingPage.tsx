import { lazy, Suspense, useMemo, useState } from 'react';
import { Leaf, Menu } from 'lucide-react';
import { teaDetails } from './data/teaDetails';
import TeaDetailModal from './components/TeaDetailModal';
import { Hero } from './components/Hero';
import { FeatureSection1 } from './sections/FeatureSection1';
import { FeatureSection2 } from './sections/FeatureSection2';
import { motion } from 'framer-motion';

const BrandStorySlider = lazy(() =>
  import('./components/BrandStorySlider').then((module) => ({ default: module.BrandStorySlider })),
);

export interface LandingPageProps {
  onStartSurvey: () => void;
  showLogo?: boolean;
}

export function LandingPage({ onStartSurvey, showLogo = true }: LandingPageProps) {
  const [selectedTeaId, setSelectedTeaId] = useState<string | null>(null);
  const [showBrandStory, setShowBrandStory] = useState(false);
  const selectedTea = useMemo(
    () => teaDetails.find((tea) => tea.id === selectedTeaId) ?? null,
    [selectedTeaId],
  );

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent/30 selection:text-white animate-fade-in relative">

      {/* Floating Pill Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[92%] md:w-[30%] max-w-3xl bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-5 py-3 md:px-8 flex items-center justify-between z-50 shadow-sm transition-all duration-300">

        {/* Spacer for desktop flex balancing */}
        <div className="hidden md:block w-8"></div>

        {/* Logo (Left on Mobile, Absolute Center on Desktop) */}
        <a href="/" className="flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
          {showLogo ? (
            <motion.img
              layoutId="main-logo"
              src="/images/logo.png"
              alt="CUSTOM TEA"
              className="h-6 md:h-7 w-auto object-contain cursor-pointer"
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          ) : (
            <div className="h-6 md:h-7 w-[100px]" /> // Placeholder matching logo width
          )}
        </a>

        {/* Right Hamburger Icon */}
        <button className="text-gray-900 hover:text-gray-600 transition-colors p-2">
          <Menu size={24} />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col w-full">
        <Hero />

        <FeatureSection1 onStartSurvey={onStartSurvey} />

        {/* Transition Text Break */}
        <section className="min-h-[40vh] py-16 px-6 flex items-center justify-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              내 몸이 원하는 완벽한 밸런스, <br className="hidden md:block" />직접 조율하세요.
            </h2>
          </motion.div>
        </section>

        <FeatureSection2 onStartBlending={() => setShowBrandStory(true)} />

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
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTeaId(tea.id);
                  }}
                  className="group cursor-pointer flex flex-col space-y-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="group relative aspect-square overflow-hidden bg-gray-50 w-full rounded-sm shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl border border-brand-text/5">
                    <img
                      src={tea.imageDefault}
                      alt={`${tea.name} cup`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                    />
                    <img
                      src={tea.imageHover}
                      alt={`${tea.name} package`}
                      loading="lazy"
                      decoding="async"
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
          <div className="flex items-center gap-2">
            <Leaf size={18} className="text-brand-accent opacity-80" />
            <span className="font-serif text-xl tracking-[0.1em] text-brand-text uppercase">Detox Tea</span>
          </div>
          <p className="text-sm font-light leading-relaxed max-w-[400px]">
            자연이 주는 온전한 휴식, 디톡스 티.<br />당신의 일상에 건강한 비움을 선사합니다.
          </p>
        </div>
        <div className="flex flex-col md:text-right gap-2 text-sm font-light">
          <p>© 2026 Detox Tea Co. All rights reserved.</p>
          <div className="flex gap-4 md:justify-end">
            <a href="#" className="hover:text-brand-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedTea && (
        <TeaDetailModal
          tea={selectedTea}
          onClose={() => setSelectedTeaId(null)}
        />
      )}

      {showBrandStory && (
        <Suspense fallback={null}>
          <BrandStorySlider onClose={() => setShowBrandStory(false)} />
        </Suspense>
      )}
    </div>
  );
}

export default LandingPage;
