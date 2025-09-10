import React, { useState, useEffect } from 'react';
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
import YoungDashboardPage from './pages/YoungDashboardPage';
import ElderlyDashboardPage from './pages/ElderlyDashboardPage';

function App() {
  const [userRole, setUserRole] = useState('');

  // 从localStorage获取用户角色
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  // 更新用户角色
  const updateUserRole = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  return (
    <Router>
      <div className="app-container">
        {/* 只在非登录页面和非仪表板页面显示导航栏 */}
        {!window.location.pathname.includes('login') && !window.location.pathname.includes('dashboard') && (
          <Navbar userRole={userRole} />
        )}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/mental" element={<MentalHealthPage />} />
            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route path="/family" element={<FamilyMonitorPage />} />
            <Route path="/communication" element={<FamilyCommunicationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route 
              path="/login" 
              element={<LoginPage onRoleSelect={updateUserRole} />} 
            />
            <Route path="/young-dashboard" element={<YoungDashboardPage />} />
            <Route path="/elderly-dashboard" element={<ElderlyDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
