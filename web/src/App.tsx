import { lazy, Suspense, useState } from 'react';
import { LandingPage } from './LandingPage';
import { IntroLoader } from './components/IntroLoader';
import { AnimatePresence } from 'framer-motion';
import type { AnswerValue } from './components/QuestionForm';
import { calculateBlendRatio, BlendResult } from './engine/calculator';

const QuestionForm = lazy(() => import('./components/QuestionForm'));
const ResultPage = lazy(() => import('./components/ResultPage'));

type ViewState = 'landing' | 'quiz' | 'result';

function ViewFallback() {
  return <div className="fixed inset-0 z-[90] bg-[#FDFCFB]/80 backdrop-blur-sm" />;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [blendResult, setBlendResult] = useState<BlendResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleStartSurvey = () => {
    setCurrentView('quiz');
    window.scrollTo(0, 0);
  };

  const handleCloseSurvey = () => {
    setCurrentView('landing');
  };

  const handleSurveyComplete = (answers: Record<string, AnswerValue>) => {
    const results = calculateBlendRatio(answers);
    setBlendResult(results);
    setCurrentView('result');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <IntroLoader key="intro-loader" onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {currentView === 'landing' && (
        <div className="w-full min-h-screen">
          <LandingPage
            showLogo={!isLoading}
            onStartSurvey={handleStartSurvey}
          />
        </div>
      )}

      {currentView === 'quiz' && (
        <Suspense fallback={<ViewFallback />}>
          <QuestionForm
            onClose={handleCloseSurvey}
            onComplete={handleSurveyComplete}
          />
        </Suspense>
      )}

      {currentView === 'result' && blendResult && (
        <Suspense fallback={<ViewFallback />}>
          <ResultPage blendResult={blendResult} onRestart={handleCloseSurvey} />
        </Suspense>
      )}
    </>
  );
}

export default App;
