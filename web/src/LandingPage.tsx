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
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[92%] md:w-[30%] max-w-3xl bg-white/95 md:bg-white/90 backdrop-blur-0 md:backdrop-blur-md border border-gray-200 rounded-full px-5 py-3 md:px-8 flex items-center justify-between z-50 shadow-sm transition-all duration-300">

        {/* Spacer for desktop flex balancing */}
        <div className="hidden md:block w-8"></div>

        {/* Logo (Absolute Center on All Screens) */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
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
        <section className="w-full min-h-[60vh] py-20 px-4 md:px-8 flex items-center justify-center bg-[#a67c7b]">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center w-full overflow-hidden"
          >
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#fdfbf9] tracking-tighter leading-none uppercase max-w-7xl mx-auto">
              TAKE CONTROL<br />OF YOUR BLEND.
            </h2>
          </motion.div>
        </section>

        <FeatureSection2 onStartBlending={() => setShowBrandStory(true)} />

        {/* Signature Base Section */}
        <section className="w-full px-6 md:px-[120px] py-24 bg-brand-text/[0.02]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4 animate-fade-in">
              <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-brand-text/40 font-bold uppercase">
                Discover The Roots
              </span>
              <h2 className="font-serif text-[28px] md:text-[40px] text-brand-text font-medium">
                Our Signature Base
              </h2>
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="flex md:hidden justify-center items-center gap-2 mb-6 text-brand-text/40 text-[10px] font-bold tracking-widest uppercase animate-pulse">
              <span className="opacity-50">←</span>
              <span>Swipe</span>
              <span className="opacity-50">→</span>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0 pb-8 md:pb-0">
              {teaDetails.map((tea, index) => (
                <div
                  key={tea.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTeaId(tea.id);
                  }}
                  className="w-[260px] sm:w-[320px] md:w-auto shrink-0 snap-center md:snap-align-none group cursor-pointer flex flex-col space-y-3 md:space-y-4 animate-fade-in"
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

      {/* ----------------- PRE-FOOTER (Brand Symmetrical Layout) ----------------- */}
      <section className="w-full bg-[#fdfbf9] min-h-[60vh] flex flex-col items-center justify-center relative py-20">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl px-8 relative">
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center shrink-0 text-black z-10 my-8 md:my-0">
            <Leaf className="w-24 h-24 md:w-32 md:h-32" strokeWidth={1} />
          </div>

          <div className="flex flex-col md:flex-row w-full justify-between items-center z-0 gap-8 md:gap-0">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-24 lg:pr-32">
              <span className="text-2xl md:text-3xl font-medium tracking-tight text-gray-900 text-center md:text-right">
                디톡스 티뿐만 아니라,
              </span>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-24 lg:pl-32">
              <span className="text-2xl md:text-3xl font-medium tracking-tight text-gray-900 text-center md:text-left">
                베리굿의 더 많은 제품을 만나보세요.
              </span>
            </div>
          </div>
        </div>
        <a
          href="https://verygood-chocolate.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-20 inline-flex items-center justify-center bg-black text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
        >
          베리굿 공식몰 방문하기
        </a>
      </section>

      {/* ----------------- MAIN FAT FOOTER ----------------- */}
      <footer className="w-full bg-white border-t border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 lg:mb-24">

            {/* Column 1: Brand */}
            <div className="flex flex-col gap-6 lg:pr-8">
              <span className="font-serif font-bold text-2xl tracking-wider text-brand-text">very goût</span>
              <p className="text-[13px] md:text-sm text-brand-text/50 font-light leading-relaxed">
                자연이 주는 온전한 휴식.<br className="hidden md:block" /> 당신의 일상에 건강한 비움을 선사합니다.
              </p>
            </div>

            {/* Column 2: Shop */}
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-[10px] md:text-xs tracking-[0.15em] uppercase text-brand-text">Shop</h4>
              <ul className="flex flex-col gap-3 text-[13px] md:text-sm text-brand-text/50 font-light">
                <li><a href="#" className="hover:text-brand-text transition-colors">British Black</a></li>
                <li><a href="#" className="hover:text-brand-text transition-colors">Asian Gold</a></li>
                <li><a href="#" className="hover:text-brand-text transition-colors">Hibiscus Fruit</a></li>
                <li><a href="#" className="hover:text-brand-text transition-colors">Minty Chocolat</a></li>
              </ul>
            </div>

            {/* Column 3: About */}
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-[10px] md:text-xs tracking-[0.15em] uppercase text-brand-text">About</h4>
              <ul className="flex flex-col gap-3 text-[13px] md:text-sm text-brand-text/50 font-light">
                <li><button onClick={() => setShowBrandStory(true)} className="hover:text-brand-text transition-colors text-left">Brand Story</button></li>
                <li><a href="#" className="hover:text-brand-text transition-colors">Stores <span className="text-[10px] uppercase ml-1 opacity-60">(대구 본점)</span></a></li>
                <li><a href="#" className="hover:text-brand-text transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 4: Social & Legal */}
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-[10px] md:text-xs tracking-[0.15em] uppercase text-brand-text">Connect</h4>
              <ul className="flex flex-col gap-3 text-[13px] md:text-sm text-brand-text/50 font-light">
                <li><a href="#" className="hover:text-brand-text transition-colors">Instagram <span className="text-[10px] mb-0 ml-1 opacity-60">(@verygood_chocolate)</span></a></li>
                <li><a href="#" className="hover:text-brand-text transition-colors">KakaoTalk</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-brand-text/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-brand-text/40 font-light">
            <p>&copy; 2026 Very Good Chocolate Studio. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-brand-text transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-text transition-colors">Terms of Service</a>
            </div>
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
