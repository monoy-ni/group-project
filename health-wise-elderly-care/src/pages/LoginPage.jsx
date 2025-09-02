import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    
    // 如果选择年轻人身份，自动跳转到年轻人仪表板
    if (role === 'young') {
      navigate('/young-dashboard');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里处理登录逻辑
    console.log('登录信息:', { username, password, role: selectedRole });
    // 可以根据选择的身份跳转到不同的页面
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">登录</h2>
        
        {/* 身份选择区域 */}
        <div className="role-selection">
          <h3 className="role-title">请选择您的身份</h3>
          <div className="role-buttons">
            <button
              className={`role-btn ${selectedRole === 'young' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('young')}
            >
              <div className="role-icon">👦</div>
              <span>我是年轻人</span>
            </button>
            
            <button
              className={`role-btn ${selectedRole === 'elderly' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('elderly')}
            >
              <div className="role-icon">👴</div>
              <span>我是老年人</span>
            </button>
            
            <button
              className={`role-btn ${selectedRole === 'admin' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('admin')}
            >
              <div className="role-icon">👨‍💼</div>
              <span>我是服务管理员</span>
            </button>
          </div>
        </div>

        {/* 登录表单 */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={!selectedRole}
          >
            登录
          </button>
        </form>

        <div className="login-footer">
          <p>还没有账号？<Link to="/register">立即注册</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;