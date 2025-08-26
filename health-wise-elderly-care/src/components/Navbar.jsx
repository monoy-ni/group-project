import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          健康与智慧养老系统
        </Link>
        <div className="navbar-menu">
          <Link to="/health" className="navbar-link">身体健康</Link>
          <Link to="/mental" className="navbar-link">心理健康</Link>
          <Link to="/entertainment" className="navbar-link">娱乐学习</Link>
          <Link to="/family" className="navbar-link">家庭监测</Link>
          <Link to="/communication" className="navbar-link">家庭沟通</Link>
          <Link to="/profile" className="navbar-link">个人中心</Link>
        </div>
        <button className="voice-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
          语音助手
        </button>
      </div>
    </nav>
  );
}

export default Navbar;