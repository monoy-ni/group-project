import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MentalHealthPage.css';

function MentalHealthPage() {
  const [activeTab, setActiveTab] = useState('mindHelper');
  const [mood, setMood] = useState(3); // 1-5 表示情绪状态
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', content: '您好！我是您的心灵助手，有什么可以帮助您的吗？' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // 模拟活动列表
  const activities = [
    { id: 1, name: '冥想放松', description: '10分钟冥想，缓解压力和焦虑', duration: '10分钟' },
    { id: 2, name: '情绪日记', description: '记录今天的心情和感受', duration: '15分钟' },
    { id: 3, name: '呼吸练习', description: '深呼吸练习，平静心情', duration: '5分钟' },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { id: chatMessages.length + 1, sender: 'user', content: inputMessage }]);
      // 模拟机器人回复
      setTimeout(() => {
        setChatMessages(prev => [...prev, { id: prev.length + 1, sender: 'bot', content: '感谢您的分享，我会认真倾听您的感受。' }]);
      }, 1000);
      setInputMessage('');
    }
  };

  return (
    <div className="mental-health-page">
      <h1>心理健康管理</h1>

      <div className="tabs">
        <button 
          className={activeTab === 'mindHelper' ? 'active' : ''} 
          onClick={() => setActiveTab('mindHelper')}
        >
          心灵助手
        </button>
        <button 
          className={activeTab === 'moodTracker' ? 'active' : ''} 
          onClick={() => setActiveTab('moodTracker')}
        >
          情绪监测
        </button>
        <button 
          className={activeTab === 'activities' ? 'active' : ''} 
          onClick={() => setActiveTab('activities')}
        >
          心理活动
        </button>
      </div>

      {activeTab === 'mindHelper' && (
        <div className="tab-content">
          <h2>心灵助手</h2>
          <p>与AI心灵助手聊天，分享您的感受和困扰。</p>

          <div className="chat-container">
            <div className="chat-messages">
              {chatMessages.map(message => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-content">{message.content}</div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="输入您想聊的内容..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>发送</button>
            </div>
          </div>

          <div className="quick-topics">
            <h3>快捷话题</h3>
            <div className="topic-buttons">
              <button className="topic-btn">我感到焦虑</button>
              <button className="topic-btn">我睡不好</button>
              <button className="topic-btn">我感到孤独</button>
              <button className="topic-btn">我压力很大</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'moodTracker' && (
        <div className="tab-content">
          <h2>情绪监测</h2>
          <p>记录和追踪您的情绪变化，了解自己的心理健康状态。</p>

          <div className="mood-tracker">
            <h3>今天的心情</h3>
            <div className="mood-scale">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  className={mood === level ? 'active' : ''}
                  onClick={() => setMood(level)}
                >
                  {level === 1 && <span>非常不好</span>}
                  {level === 2 && <span>不好</span>}
                  {level === 3 && <span>一般</span>}
                  {level === 4 && <span>好</span>}
                  {level === 5 && <span>非常好</span>}
                </button>
              ))}
            </div>
            <button className="btn-primary">记录心情</button>
          </div>

          <div className="mood-history">
            <h3>心情历史</h3>
            <div className="mood-chart">
              {/* 这里将显示心情变化图表 */}
              <div className="chart-placeholder">
                <p>心情变化图表将在这里显示</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div className="tab-content">
          <h2>心理活动</h2>
          <p>参与有益心理健康的活动，缓解压力，放松心情。</p>

          <div className="activities-grid">
            {activities.map(activity => (
              <div key={activity.id} className="activity-card">
                <h3>{activity.name}</h3>
                <p className="activity-description">{activity.description}</p>
                <p className="activity-duration">{activity.duration}</p>
                <button className="btn-secondary">开始</button>
              </div>
            ))}
          </div>

          <div className="support-groups">
            <h3>支持小组</h3>
            <p>加入兴趣小组，与志同道合的朋友交流分享。</p>
            <div className="groups-grid">
              <div className="group-card">
                <h4>冥想爱好者</h4>
                <p>成员: 128人</p>
                <button className="join-btn">加入</button>
              </div>
              <div className="group-card">
                <h4>书法交流</h4>
                <p>成员: 95人</p>
                <button className="join-btn">加入</button>
              </div>
              <div className="group-card">
                <h4>园艺爱好者</h4>
                <p>成员: 76人</p>
                <button className="join-btn">加入</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MentalHealthPage;