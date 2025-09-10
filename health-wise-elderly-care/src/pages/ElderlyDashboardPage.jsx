import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import './ElderlyDashboardPage.css';

const ElderlyDashboardPage = () => {
  // WebSocket连接状态
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  
  // 固定为老年人角色
  const isElderlyRole = true;

  // WebSocket连接
  useEffect(() => {
    // 连接到WebSocket服务器
    const connectWebSocket = () => {
      try {
        // 连接到本地WebSocket服务器
        ws.current = new WebSocket('ws://localhost:3001');
        
        ws.current.onopen = () => {
          setIsConnected(true);
          console.log('WebSocket连接成功');
        };
        
        ws.current.onclose = () => {
          setIsConnected(false);
          console.log('WebSocket连接关闭');
        };
        
        ws.current.onerror = (error) => {
          console.error('WebSocket错误:', error);
          setIsConnected(false);
        };
        
      } catch (error) {
        console.error('WebSocket连接失败:', error);
      }
    };
    
    connectWebSocket();
    
    return () => {
      // 清理时关闭WebSocket连接
      if (ws.current) {
        ws.current.close();
      }
    };
  });



  // 退出登录处理
  const handleLogout = () => {
    // 清除localStorage中的用户角色
    localStorage.removeItem('userRole');
    // 跳转到登录页面
    window.location.href = '/login';
  };





  return (
    <div className="elderly-dashboard">
      {/* 导航栏 */}
      <Navbar userRole="elderly" />
      
      {/* 顶部导航 */}
      <div className="dashboard-header">
        <div className="user-info">
          <span>👴 老年人身份</span>
          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            🚪 退出登录
          </button>
        </div>
      </div>

      {/* 功能快速切换栏 */}
      <div className="function-bar">
        <button className="function-btn" onClick={() => window.location.href = '/health'}>
          💪 身体健康
        </button>
        <button className="function-btn" onClick={() => window.location.href = '/mental'}>
          🧠 心理健康
        </button>
        <button className="function-btn" onClick={() => window.location.href = '/entertainment'}>
          🎭 娱乐学习
        </button>
        <button className="function-btn" onClick={() => window.location.href = '/communication'}>
          👨‍👩‍👧‍👦 家庭沟通
        </button>
        <button className="function-btn" onClick={() => window.location.href = '/profile'}>
          👤 个人中心
        </button>
      </div>

      {/* 宣传栏区域 */}
      <div className="promotion-section">
        {/* 温馨标语 */}
        <div className="warm-message">
          <h2>❤️ 温馨养老，幸福晚年</h2>
          <p>让关爱伴随每一天，让温暖充满每一刻</p>
        </div>
        
        {/* 滑动宣传栏 */}
        <div className="carousel-container">
          <div className="carousel">
            <div className="carousel-item">
              <div className="carousel-image health-monitor"></div>
              <div className="carousel-content">
                <h3>健康监测</h3>
                <p>实时关注您的身体健康状况</p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-image family-care"></div>
              <div className="carousel-content">
                <h3>家庭关爱</h3>
                <p>家人随时在身边，温暖从不缺席</p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-image happy-life"></div>
              <div className="carousel-content">
                <h3>幸福生活</h3>
                <p>享受丰富多彩的晚年时光</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 温馨语录 */}
        <div className="warm-quotes">
          <div className="quote">
            <p>"岁月静好，因为有爱相伴"</p>
          </div>
          <div className="quote">
            <p>"夕阳无限好，温馨伴晚年"</p>
          </div>
          <div className="quote">
            <p>"关爱老人，就是关爱未来的自己"</p>
          </div>
        </div>
      </div>



    </div>
  );
};

export default ElderlyDashboardPage;