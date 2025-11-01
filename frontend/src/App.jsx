import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ChatSupport from './pages/ChatSupport';
import SubmitReport from './pages/SubmitReport';
import AiAnalysis from './pages/AiAnalysis';
import FindHelp from './pages/FindHelp';
import FindSupport from './pages/FindHelp';
import ReportAnonymously from './pages/SubmitReport';  
function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat-support" element={<ChatSupport />} />
          <Route path="/submit-report" element={<SubmitReport />} />
          <Route path="/report-anonymously" element={<Navigate to="/submit-report" replace />} />
          <Route path="/ai-analysis" element={<AiAnalysis />} />
          <Route path="/find-help" element={<FindHelp />} />
          <Route path="/find-support" element={<FindSupport />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;