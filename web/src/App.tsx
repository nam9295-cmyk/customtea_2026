import { lazy, Suspense, useState } from 'react';
import { LandingPage } from './LandingPage';
import { IntroLoader } from './components/IntroLoader';
import { AnimatePresence } from 'framer-motion';
import type { AnswerValue } from './components/QuestionForm';
import { calculateRecommendation, RecommendationResult } from './engine/calculator';

const QuestionForm = lazy(() => import('./components/QuestionForm'));
const ResultPage = lazy(() => import('./components/ResultPage'));

type ViewState = 'landing' | 'quiz' | 'result';

function ViewFallback() {
  return <div className="fixed inset-0 z-[90] bg-[#FDFCFB]/80 backdrop-blur-sm" />;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [recommendationResult, setRecommendationResult] = useState<RecommendationResult | null>(null);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, AnswerValue> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleStartSurvey = () => {
    setCurrentView('quiz');
    window.scrollTo(0, 0);
  };

  const handleCloseSurvey = () => {
    setCurrentView('landing');
    setSurveyAnswers(null);
  };

  const handleSurveyComplete = (answers: Record<string, AnswerValue>) => {
    const result = calculateRecommendation(answers);
    setRecommendationResult(result);
    setSurveyAnswers(answers);
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

      {currentView === 'result' && recommendationResult && surveyAnswers && (
        <Suspense fallback={<ViewFallback />}>
          <ResultPage
            recommendationResult={recommendationResult}
            answers={surveyAnswers}
            onRestart={handleCloseSurvey}
          />
        </Suspense>
      )}
    </>
  );
}

export default App;
