import { useState } from 'react';
import { LandingPage } from './LandingPage';
import QuestionForm, { AnswerValue } from './components/QuestionForm';
import ResultPage from './components/ResultPage';
import TeaDetailModal from './components/TeaDetailModal';
import { calculateBlendRatio, BlendResult } from './engine/calculator';
import { TeaDetail } from './data/teaDetails';

type ViewState = 'landing' | 'quiz' | 'result';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [blendResult, setBlendResult] = useState<BlendResult[] | null>(null);
  const [selectedTea, setSelectedTea] = useState<TeaDetail | null>(null);

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
      <LandingPage
        onStartSurvey={handleStartSurvey}
      />

      {currentView === 'quiz' && (
        <QuestionForm
          onClose={handleCloseSurvey}
          onComplete={handleSurveyComplete}
        />
      )}

      {currentView === 'result' && blendResult && (
        <ResultPage blendResult={blendResult} onRestart={handleCloseSurvey} />
      )}

      {/* Modal rendered at root level — no z-index conflict */}
      {selectedTea && (
        <TeaDetailModal tea={selectedTea} onClose={() => setSelectedTea(null)} />
      )}
    </>
  );
}

export default App;
