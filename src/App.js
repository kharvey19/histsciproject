import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpeningPage from './components/OpeningPage';
import SurveyPage from './components/SurveyPage';
import ResultsPage from './components/ResultsPage';
import IntroductionPage from './components/IntroductionPage';
import ThankYouPage from "./components/ThankYouPage"; // Adjust the path based on your folder structure


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/intro" element={<IntroductionPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
