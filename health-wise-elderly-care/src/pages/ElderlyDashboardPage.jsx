import React, { useState, useEffect, useRef } from 'react';
import './ElderlyDashboardPage.css';

const ElderlyDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('chat');
  
  // WebSocket连接状态
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  
  // 角色状态（true为老年人，false为年轻人）
  const [isElderlyRole, setIsElderlyRole] = useState(true);
  
  // 对话状态
  const [messages, setMessages] = useState([
    { 
      role: 'young', 
      content: '爸妈，最近工作忙不忙？',
      timestamp: new Date(),
      type: 'text'
    },
    { 
      role: 'elderly', 
      content: '还好啦，你们最近怎么样？',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // WebSocket连接和消息处理
  useEffect(() => {
    // 连接到WebSocket服务器
    const connectWebSocket = () => {
      try {
        // 连接到本地WebSocket服务器
        ws.current = new WebSocket('ws://localhost:3001');
        
        ws.current.onopen = () => {
          setIsConnected(true);
          console.log('WebSocket连接成功');
          
          // 发送连接成功消息
          ws.current.send(JSON.stringify({
            type: 'user_joined',
            data: {
              role: isElderlyRole ? 'elderly' : 'young',
              content: '用户加入聊天',
              timestamp: new Date().toISOString()
            }
          }));
        };
        
        ws.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
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
  }, []);
  
  // 处理WebSocket接收到的消息
  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case 'message':
        // 接收到的年轻人消息
        setMessages(prev => [...prev, {
          role: 'young',
          content: data.data.content,
          timestamp: new Date(data.data.timestamp),
          type: 'text'
        }]);
        break;
        
      case 'status':
        // 年轻人在线状态更新
        console.log('年轻人状态:', data.data);
        break;
        
      default:
        console.log('收到未知类型的消息:', data);
    }
  };
  
  // 模拟WebSocket消息接收（用于演示）
  const simulateWebSocketMessage = (data) => {
    handleWebSocketMessage(data);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        role: isElderlyRole ? 'elderly' : 'young', 
        content: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      
      // 添加到本地消息列表
      setMessages(prev => [...prev, message]);
      
      // 通过WebSocket发送消息
      if (isConnected && ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({
          type: 'message',
          data: message
        }));
        console.log('消息已发送:', newMessage);
      } else {
        console.warn('WebSocket未连接，消息无法实时同步');
      }
      
      setNewMessage('');
    }
  };

  // 示例对话启动
  const startExampleConversation = () => {
    // 模拟发送老年人消息
    handleSendMessage();
  };

  // 切换角色
  const toggleRole = () => {
    setIsElderlyRole(!isElderlyRole);
    // 清空当前对话
    setMessages([
      { 
        role: isElderlyRole ? 'young' : 'elderly', 
        content: isElderlyRole ? '你好，我是年轻人' : '你好，我是老年人',
        timestamp: new Date(),
        type: 'text'
      }
    ]);
  };

  return (
    <div className="elderly-dashboard">
      {/* 顶部导航 */}
      <div className="dashboard-header">
        <h1>{isElderlyRole ? '老年人沟通平台' : '年轻人关爱平台'}</h1>
        <div className="user-info">
          <span>{isElderlyRole ? '👴 老年人身份' : '👦 年轻人身份'}</span>
          <button 
            onClick={toggleRole}
            className="role-toggle-btn"
          >
            🔄 切换角色
          </button>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="tab-navigation">
        <button 
          className={activeTab === 'chat' ? 'active' : ''} 
          onClick={() => setActiveTab('chat')}
        >
          💬 与子女对话
        </button>
        <button 
          className={activeTab === 'health' ? 'active' : ''} 
          onClick={() => setActiveTab('health')}
        >
          💓 健康记录
        </button>
        <button 
          className={activeTab === 'emergency' ? 'active' : ''} 
          onClick={() => setActiveTab('emergency')}
        >
          🆘 紧急求助
        </button>
      </div>

      {/* 内容区域 */}
      <div className="dashboard-content">
        {activeTab === 'chat' && (
          <div className="chat-tab">
            <div className="conversation-layout">
              {/* 主对话区域 */}
              <div className="main-chat">
                <div className="chat-header">
                  <div className="chat-status">
                    <h3>{isElderlyRole ? '👦 与子女的对话' : '👴 与爸妈的对话'}</h3>
                    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                      <span className="status-dot"></span>
                      {isConnected ? '实时连接中' : '连接断开'}
                    </div>
                  </div>
                  <button 
                    onClick={startExampleConversation}
                    className="example-btn"
                  >
                    💬 发送消息
                  </button>
                </div>
                
                <div className="messages">
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role} ${msg.type}`}>
                      <div className="message-avatar">
                        {msg.role === 'elderly' ? '👴' : '👦'}
                      </div>
                      <div className="message-content">
                        <div className="message-text">{msg.content}</div>
                        <div className="message-time">
                          {msg.timestamp.toLocaleTimeString('zh-CN', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="input-area">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isElderlyRole ? "回复子女..." : "回复爸妈..."}
                    className="message-input"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="send-button"
                  >
                    📤
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="health-tab">
            <h2>我的健康记录</h2>
            <div className="health-summary">
              <div className="summary-card">
                <h4>今日健康状态</h4>
                <p className="status-good">✅ 一切正常</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="emergency-tab">
            <h2>紧急求助</h2>
            <div className="emergency-buttons">
              <button className="emergency-btn primary">
                📞 呼叫子女
              </button>
              <button className="emergency-btn secondary">
                🚑 呼叫救护车
              </button>
              <button className="emergency-btn warning">
                🆘 一键求助
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElderlyDashboardPage;