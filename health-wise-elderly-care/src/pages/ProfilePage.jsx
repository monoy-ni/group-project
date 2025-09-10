import React, { useState } from 'react';
import './ProfilePage.css';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  
  // 用户信息
  const userInfo = {
    name: '张老先生',
    age: 72,
    gender: '男',
    phone: '138****6789',
    avatar: '/avatar.png',
    bloodType: 'A型',
    emergencyContact: '李女士',
    emergencyPhone: '139****4567',
  };
  
  // 健康档案
  const healthRecords = [
    {
      id: 1,
      date: '2023-04-15',
      type: '常规体检',
      hospital: '北京协和医院',
      doctor: '王医生',
      summary: '血压略高，建议控制饮食',
    },
    {
      id: 2,
      date: '2023-01-20',
      type: '专科检查',
      hospital: '上海第一人民医院',
      doctor: '李医生',
      summary: '心脏功能良好，定期复查',
    },
  ];
  
  // 用药记录
  const medicationRecords = [
    {
      id: 1,
      name: '降压药',
      dosage: '1片/天',
      frequency: '早饭后',
      startDate: '2023-04-16',
      doctor: '王医生',
    },
    {
      id: 2,
      name: '钙片',
      dosage: '1片/天',
      frequency: '晚饭后',
      startDate: '2023-02-01',
      doctor: '张医生',
    },
  ];
  
  // 个人设置
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  
  return (
    <div className="profile-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/elderly-dashboard')}>
          ← 返回
        </button>
        <h1>个人中心</h1>
      </div>

      {/* 功能快速切换栏 */}
      <div className="function-bar">
        <button className="function-btn" onClick={() => navigate('/health')}>
          💪 身体健康
        </button>
        <button className="function-btn" onClick={() => navigate('/mental')}>
          🧠 心理健康
        </button>
        <button className="function-btn" onClick={() => navigate('/entertainment')}>
          🎭 娱乐学习
        </button>
        <button className="function-btn" onClick={() => navigate('/communication')}>
          👨‍👩‍👧‍👦 家庭沟通
        </button>
        <button className="function-btn active">
          👤 个人中心
        </button>
      </div>
       <h2 className="page-title">个人中心</h2>
      
      {/* 用户头像和基本信息卡片 */}
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar"></div>
          <button className="change-avatar-btn">更换头像</button>
        </div>
        <div className="basic-info">
          <h3 className="user-name">{userInfo.name}</h3>
          <div className="info-row">
            <span className="info-label">年龄:</span>
            <span className="info-value">{userInfo.age}岁</span>
          </div>
          <div className="info-row">
            <span className="info-label">性别:</span>
            <span className="info-value">{userInfo.gender}</span>
          </div>
          <div className="info-row">
            <span className="info-label">血型:</span>
            <span className="info-value">{userInfo.bloodType}</span>
          </div>
          <div className="info-row">
            <span className="info-label">联系电话:</span>
            <span className="info-value">{userInfo.phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">紧急联系人:</span>
            <span className="info-value">{userInfo.emergencyContact}</span>
          </div>
          <div className="info-row">
            <span className="info-label">紧急联系电话:</span>
            <span className="info-value">{userInfo.emergencyPhone}</span>
          </div>
        </div>
      </div>
      
      {/* 标签页导航 */}
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          基本信息
        </button>
        <button
          className={`tab-button ${activeTab === 'health' ? 'active' : ''}`}
          onClick={() => setActiveTab('health')}
        >
          健康档案
        </button>
        <button
          className={`tab-button ${activeTab === 'medication' ? 'active' : ''}`}
          onClick={() => setActiveTab('medication')}
        >
          用药记录
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          个人设置
        </button>
      </div>
      
      {/* 标签页内容 */}
      <div className="content-container">
        {activeTab === 'basic' && (
          <div className="basic-info-content">
            <h3 className="section-title">个人基本信息</h3>
            <div className="info-grid">
              <div className="info-item">
                <label className="info-label">姓名</label>
                <input type="text" value={userInfo.name} readOnly className="info-input" />
              </div>
              <div className="info-item">
                <label className="info-label">年龄</label>
                <input type="text" value={userInfo.age} readOnly className="info-input" />
              </div>
              <div className="info-item">
                <label className="info-label">性别</label>
                <input type="text" value={userInfo.gender} readOnly className="info-input" />
              </div>
              <div className="info-item">
                <label className="info-label">血型</label>
                <input type="text" value={userInfo.bloodType} readOnly className="info-input" />
              </div>
              <div className="info-item">
                <label className="info-label">联系电话</label>
                <input type="text" value={userInfo.phone} readOnly className="info-input" />
              </div>
              <div className="info-item">
                <label className="info-label">紧急联系人</label>
                <input type="text" value={userInfo.emergencyContact} readOnly className="info-input" />
              </div>
              <div className="info-item">
                <label className="info-label">紧急联系电话</label>
                <input type="text" value={userInfo.emergencyPhone} readOnly className="info-input" />
              </div>
            </div>
            <button className="edit-info-btn">编辑信息</button>
          </div>
        )}
        
        {activeTab === 'health' && (
          <div className="health-records-content">
            <h3 className="section-title">健康档案</h3>
            <div className="records-list">
              {healthRecords.map((record) => (
                <div key={record.id} className="record-item">
                  <div className="record-header">
                    <h4 className="record-type">{record.type}</h4>
                    <span className="record-date">{record.date}</span>
                  </div>
                  <div className="record-info">
                    <div className="info-row">
                      <span className="info-label">医院:</span>
                      <span className="info-value">{record.hospital}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">医生:</span>
                      <span className="info-value">{record.doctor}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">检查总结:</span>
                      <span className="info-value">{record.summary}</span>
                    </div>
                  </div>
                  <button className="view-details-btn">查看详情</button>
                </div>
              ))}
            </div>
            <Link to="/health" className="add-record-btn">添加健康记录</Link>
          </div>
        )}
        
        {activeTab === 'medication' && (
          <div className="medication-records-content">
            <h3 className="section-title">用药记录</h3>
            <div className="medication-list">
              {medicationRecords.map((medication) => (
                <div key={medication.id} className="medication-item">
                  <div className="medication-header">
                    <h4 className="medication-name">{medication.name}</h4>
                  </div>
                  <div className="medication-info">
                    <div className="info-row">
                      <span className="info-label">剂量:</span>
                      <span className="info-value">{medication.dosage}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">频率:</span>
                      <span className="info-value">{medication.frequency}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">开始日期:</span>
                      <span className="info-value">{medication.startDate}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">医嘱医生:</span>
                      <span className="info-value">{medication.doctor}</span>
                    </div>
                  </div>
                  <button className="set-reminder-btn">设置提醒</button>
                </div>
              ))}
            </div>
            <button className="add-medication-btn">添加用药记录</button>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="settings-content">
            <h3 className="section-title">个人设置</h3>
            <div className="settings-list">
              <div className="setting-item">
                <label className="setting-label">通知设置</label>
                <div className="setting-control">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <label htmlFor="notifications">接收健康提醒通知</label>
                </div>
              </div>
              <div className="setting-item">
                <label className="setting-label">主题设置</label>
                <div className="setting-control">
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="light">浅色主题</option>
                    <option value="dark">深色主题</option>
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <label className="setting-label">语言设置</label>
                <div className="setting-control">
                  <select>
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <label className="setting-label">隐私设置</label>
                <div className="setting-control">
                  <button className="privacy-settings-btn">隐私设置</button>
                </div>
              </div>
            </div>
            <button className="change-password-btn">修改密码</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;