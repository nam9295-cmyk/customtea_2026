import { useState } from 'react';
import LandingPage from './LandingPage';
import QuestionForm from './components/QuestionForm';
import ResultPage from './components/ResultPage';

type ViewState = 'landing' | 'quiz' | 'result';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  // Temporary storage, can be used later or sent to an API
  const [, setUserAnswers] = useState<Record<string, string | string[]> | null>(null);

  const handleStartSurvey = () => {
    setCurrentView('quiz');
    window.scrollTo(0, 0); // Ensure user is at top of screen for quiz
  };

  const handleCloseSurvey = () => {
    setCurrentView('landing');
  };

  const handleSurveyComplete = (answers: Record<string, string | string[]>) => {
    setUserAnswers(answers);
    setCurrentView('result');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <LandingPage onStartSurvey={handleStartSurvey} />

      {/* Conditionally render forms over the landing page so it doesn't unmount immediately feeling abrupt. 
          The full screen nature of the quiz masks the landing page underneath. */}
      {currentView === 'quiz' && (
        <QuestionForm
          onClose={handleCloseSurvey}
          onComplete={handleSurveyComplete}
        />
      )}

      {currentView === 'result' && (
        <div className="fixed inset-0 z-[200]">
          <ResultPage />
        </div>
      )}
    </>
  );
}

export default App;
