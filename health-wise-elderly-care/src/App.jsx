import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HealthPage from './pages/HealthPage';
import MentalHealthPage from './pages/MentalHealthPage';
import EntertainmentPage from './pages/EntertainmentPage';
import FamilyMonitorPage from './pages/FamilyMonitorPage';
import ProfilePage from './pages/ProfilePage';
import FamilyCommunicationPage from './pages/FamilyCommunicationPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/mental" element={<MentalHealthPage />} />
            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route path="/family" element={<FamilyMonitorPage />} />
            <Route path="/communication" element={<FamilyCommunicationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
