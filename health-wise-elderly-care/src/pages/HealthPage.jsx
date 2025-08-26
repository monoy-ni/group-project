import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HealthPage.css';

function HealthPage() {
  // 模拟健康数据
  const healthData = {
    heartRate: 72,
    bloodPressure: '120/80',
    bloodSugar: 5.2,
    weight: 68,
  };

  // 模拟最近的健康记录
  const recentRecords = [
    { id: 1, date: '2025-08-23', type: '心率', value: 75 },
    { id: 2, date: '2025-08-23', type: '血压', value: '122/82' },
    { id: 3, date: '2025-08-22', type: '血糖', value: 5.4 },
    { id: 4, date: '2025-08-22', type: '体重', value: 68.5 },
  ];

  // 模拟推荐食谱
  const recommendedRecipes = [
    { id: 1, name: '清蒸鱼', description: '富含蛋白质，低脂肪，有助于心血管健康', image: '/recipe1.jpg' },
    { id: 2, name: '蔬菜沙拉', description: '富含维生素和纤维素，促进消化', image: '/recipe2.jpg' },
    { id: 3, name: '杂粮粥', description: '富含膳食纤维，有助于控制血糖', image: '/recipe3.jpg' },
  ];

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="health-page">
      <h1>身体健康管理</h1>

      <div className="tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          健康概览
        </button>
        <button 
          className={activeTab === 'consultation' ? 'active' : ''} 
          onClick={() => setActiveTab('consultation')}
        >
          在线问诊
        </button>
        <button 
          className={activeTab === 'recipes' ? 'active' : ''} 
          onClick={() => setActiveTab('recipes')}
        >
          饮食推荐
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="tab-content">
          <h2>健康数据概览</h2>
          <div className="health-cards">
            <div className="health-card">
              <div className="health-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div className="health-value">{healthData.heartRate}<span className="unit">bpm</span></div>
              <div className="health-label">心率</div>
            </div>

            <div className="health-card">
              <div className="health-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <div className="health-value">{healthData.bloodPressure}</div>
              <div className="health-label">血压</div>
            </div>

            <div className="health-card">
              <div className="health-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect width="8" height="12" x="8" y="2" rx="1" ry="1"></rect>
                </svg>
              </div>
              <div className="health-value">{healthData.bloodSugar}<span className="unit">mmol/L</span></div>
              <div className="health-label">血糖</div>
            </div>

            <div className="health-card">
              <div className="health-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18h12"></path>
                  <path d="M8 2v4"></path>
                  <path d="m16 2 2 4"></path>
                  <path d="M12 18V2"></path>
                </svg>
              </div>
              <div className="health-value">{healthData.weight}<span className="unit">kg</span></div>
              <div className="health-label">体重</div>
            </div>
          </div>

          <h2>最近健康记录</h2>
          <div className="records-table">
            <table>
              <thead>
                <tr>
                  <th>日期</th>
                  <th>类型</th>
                  <th>数值</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {recentRecords.map(record => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.type}</td>
                    <td>{record.value}</td>
                    <td><button className="view-btn">查看详情</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="monitoring-section">
            <h2>实时健康监测</h2>
            <div className="monitoring-status">
              <div className="status-indicator active"></div>
              <p>监测中，设备正常连接</p>
            </div>
            <button className="btn-primary">查看实时数据</button>
          </div>
        </div>
      )}

      {activeTab === 'consultation' && (
        <div className="tab-content">
          <h2>在线问诊</h2>
          <p>选择您需要咨询的科室，我们的医生将为您提供专业的健康建议。</p>

          <div className="departments-grid">
            <div className="department-card">
              <div className="department-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3>心内科</h3>
              <p>心脏和血管疾病的诊断与治疗</p>
              <button className="btn-secondary">立即咨询</button>
            </div>

            <div className="department-card">
              <div className="department-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 18v-6"></path>
                  <path d="M5.07 19a2 2 0 0 1-1.21-3.75L7 13.05M19 19a2 2 0 0 0 1.21-3.75L17 13.05"></path>
                  <path d="M8.5 14.5a2.5 2.5 0 0 0 3 0"></path>
                  <circle cx="12" cy="11" r="3"></circle>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              <h3>神经内科</h3>
              <p>神经系统疾病的诊断与治疗</p>
              <button className="btn-secondary">立即咨询</button>
            </div>

            <div className="department-card">
              <div className="department-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect width="8" height="12" x="8" y="2" rx="1" ry="1"></rect>
                </svg>
              </div>
              <h3>内分泌科</h3>
              <p>糖尿病、甲状腺等内分泌疾病的治疗</p>
              <button className="btn-secondary">立即咨询</button>
            </div>

            <div className="department-card">
              <div className="department-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m20.84 4.61-5.59 5.59a2 2 0 0 1-2.83 0L2 7l1.41-1.41"/>
                  <path d="m8.82 12 4 4L22 6.01"/>
                </svg>
              </div>
              <h3>骨科</h3>
              <p>骨骼、关节疾病的诊断与治疗</p>
              <button className="btn-secondary">立即咨询</button>
            </div>
          </div>

          <div className="consultation-history">
            <h3>问诊历史</h3>
            {recentRecords.length === 0 ? (
              <p>暂无问诊记录</p>
            ) : (
              <ul className="history-list">
                {recentRecords.map(record => (
                  <li key={record.id}>
                    <span className="history-date">{record.date}</span>
                    <span className="history-type">{record.type}咨询</span>
                    <button className="view-btn">查看详情</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="tab-content">
          <h2>饮食推荐</h2>
          <p>根据您的健康状况和饮食偏好，为您推荐当季最健康的菜谱。</p>

          <div className="diet-preference">
            <h3>我的饮食偏好</h3>
            <div className="preference-tags">
              <span className="tag">低盐</span>
              <span className="tag">低脂</span>
              <span className="tag">高纤维</span>
              <button className="edit-btn">编辑</button>
            </div>
          </div>

          <h3>今日推荐菜谱</h3>
          <div className="recipes-grid">
            {recommendedRecipes.map(recipe => (
              <div className="recipe-card" key={recipe.id}>
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.name} />
                </div>
                <div className="recipe-info">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.description}</p>
                  <button className="view-btn">查看详情</button>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary">查看更多菜谱</button>
        </div>
      )}
    </div>
  );
}

export default HealthPage;