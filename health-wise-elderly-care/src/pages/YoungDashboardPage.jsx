import React, { useState, useEffect, useRef } from 'react';
import './YoungDashboardPage.css';

const YoungDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('monitor');

  // 模拟老年人监测数据
  const elderlyData = {
    name: '张老先生',
    age: 72,
    location: '客厅',
    mood: '开心',
    heartRate: 75,
    bloodPressure: '125/80',
    lastUpdate: '2分钟前'
  };

  // 健康记录数据
  const healthRecords = [
    { date: '2024-01-15', type: '血压测量', value: '130/85', status: '正常' },
    { date: '2024-01-14', type: '血糖测量', value: '6.2 mmol/L', status: '正常' },
    { date: '2024-01-13', type: '体温测量', value: '36.5°C', status: '正常' }
  ];

  // 科普知识数据
  const knowledgeArticles = [
    { title: '老年人饮食注意事项', category: '饮食健康' },
    { title: '预防老年人跌倒的方法', category: '安全护理' },
    { title: '老年人心理关怀技巧', category: '心理健康' },
    { title: '常见老年疾病预防', category: '疾病预防' }
  ];

  // 家政服务项目
  const housekeepingServices = [
    { name: '日常保洁', price: '100元/次', rating: 4.8 },
    { name: '专业护理', price: '200元/次', rating: 4.9 },
    { name: '餐饮配送', price: '30元/餐', rating: 4.7 },
    { name: '医疗陪护', price: '150元/次', rating: 4.9 }
  ];

  // WebSocket连接状态
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  
  // 角色状态（true为年轻人，false为老年人）
  const [isYoungRole, setIsYoungRole] = useState(true);
  
  // 对话状态 - 年轻人与老年人对话
  const [messages, setMessages] = useState([
    { 
      role: 'elderly', 
      content: '小明啊，最近工作忙不忙？',
      timestamp: new Date(),
      type: 'text'
    },
    { 
      role: 'young', 
      content: '还好啦爸妈，你们最近怎么样？',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  
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
              role: isYoungRole ? 'young' : 'elderly',
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
        // 接收到的老年人消息
        setMessages(prev => [...prev, {
          role: 'elderly',
          content: data.data.content,
          timestamp: new Date(data.data.timestamp),
          type: 'text'
        }]);
        
        // 分析老年人消息并提供建议
        const suggestions = analyzeElderlyMessage(data.data.content);
        if (suggestions.length > 0) {
          setAiSuggestions(suggestions);
        }
        break;
        
      case 'status':
        // 老年人在线状态更新
        console.log('老年人状态:', data.data);
        break;
        
      default:
        console.log('收到未知类型的消息:', data);
    }
  };
  
  // 模拟WebSocket消息接收（用于演示）
  const simulateWebSocketMessage = (data) => {
    handleWebSocketMessage(data);
  };

  // 模拟老年人健康记录
  const elderlyHealthRecords = {
    bloodPressure: [{ date: '2024-01-15', value: '145/90' }],
    moodRecords: [{ date: '2024-01-15', mood: '忧虑' }],
    recentComplaints: ['最近有点头晕']
  };

  // 智能分析老年人消息并提供建议（仅年轻人可见）
  const analyzeElderlyMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    const suggestions = [];
    
    // 检测健康相关关键词
    if (lowerMessage.includes('不想出门') || lowerMessage.includes('不舒服')) {
      // 检查血压记录
      const latestBP = elderlyHealthRecords.bloodPressure[elderlyHealthRecords.bloodPressure.length - 1];
      if (latestBP && parseInt(latestBP.value.split('/')[0]) > 140) {
        suggestions.push({
          type: 'health_alert',
          title: '⚠️ 高血压预警',
          content: `爸妈最近的血压${latestBP.value}偏高，可能是不舒服的原因。建议：\n• 询问具体哪里不舒服\n• 提醒测量血压\n• 关注服药情况`,
          urgency: 'high'
        });
      }
      
      // 检查心情记录
      const latestMood = elderlyHealthRecords.moodRecords[elderlyHealthRecords.moodRecords.length - 1];
      if (latestMood && latestMood.mood === '忧虑') {
        suggestions.push({
          type: 'mood_alert',
          title: '😔 情绪异常',
          content: '注意到爸妈最近心情不太好，可能有什么烦心事。建议：\n• 耐心倾听\n• 给予情感支持\n• 安排一些轻松的活动',
          urgency: 'medium'
        });
      }
      
      if (suggestions.length === 0) {
        suggestions.push({
          type: 'general_care',
          title: '💖 关怀建议',
          content: '爸妈表达不舒服，建议：\n• 详细询问具体症状\n• 表达关心和理解\n• 必要时协助就医',
          urgency: 'medium'
        });
      }
    }
    
    // 检测疼痛相关关键词
    if (lowerMessage.includes('头疼') || lowerMessage.includes('头晕')) {
      suggestions.push({
        type: 'symptom_alert',
        title: '🤕 症状提醒',
        content: '头疼头晕可能是血压问题或疲劳所致。建议：\n• 询问发作频率和程度\n• 提醒休息和测量血压\n• 关注是否有其他伴随症状',
        urgency: 'high'
      });
    }
    
    // 检测睡眠问题
    if (lowerMessage.includes('睡不着') || lowerMessage.includes('失眠')) {
      suggestions.push({
        type: 'sleep_advice',
        title: '🌙 睡眠建议',
        content: '睡眠问题会影响健康。建议：\n• 创造安静的睡眠环境\n• 建议睡前喝温牛奶\n• 避免晚间兴奋性活动\n• 必要时咨询医生',
        urgency: 'medium'
      });
    }
    
    // 检测孤独感表达
    if (lowerMessage.includes('一个人') || lowerMessage.includes('无聊') || lowerMessage.includes('没人')) {
      suggestions.push({
        type: 'loneliness',
        title: '🤗 情感支持',
        content: '爸妈可能感到孤独。建议：\n• 增加沟通频率\n• 安排视频通话\n• 建议参加社区活动\n• 考虑养宠物陪伴',
        urgency: 'medium'
      });
    }
    
    // 检测饮食相关
    if (lowerMessage.includes('吃不下') || lowerMessage.includes('没胃口')) {
      suggestions.push({
        type: 'diet_advice',
        title: '🍲 饮食建议',
        content: '食欲不振可能源于身体不适或情绪问题。建议：\n• 准备易消化的食物\n• 少食多餐\n• 关注口腔健康\n• 必要时就医检查',
        urgency: 'medium'
      });
    }
    
    return suggestions;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        role: isYoungRole ? 'young' : 'elderly', 
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
      
      // 清空之前的建议
      setAiSuggestions([]);
    }
  };

  // 退出登录处理
  const handleLogout = () => {
    // 清除localStorage中的用户角色
    localStorage.removeItem('userRole');
    // 跳转到登录页面
    window.location.href = '/login';
  };

  // 模拟老年人回复（通过WebSocket接收）
  const simulateElderlyResponse = (message) => {
    // 模拟WebSocket接收老年人消息
    simulateWebSocketMessage({
      type: 'message',
      data: {
        role: 'elderly',
        content: message,
        timestamp: new Date()
      }
    });
  };

  // 示例对话启动
  const startExampleConversation = () => {
    simulateElderlyResponse('最近不太想出门，感觉身体有点不舒服…');
  };

  // 切换角色
  const toggleRole = () => {
    setIsYoungRole(!isYoungRole);
    // 清空当前对话
    setMessages([
      { 
        role: isYoungRole ? 'elderly' : 'young', 
        content: isYoungRole ? '你好，我是老年人' : '你好，我是年轻人',
        timestamp: new Date(),
        type: 'text'
      }
    ]);
    setAiSuggestions([]);
  };

  return (
    <div className="young-dashboard">
      {/* 顶部导航 */}
      <div className="dashboard-header">
        <h1>老年人关爱平台</h1>
        <div className="user-info">
          <span>{isYoungRole ? '👦 年轻人身份' : '👴 老年人身份'}</span>
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
          className={activeTab === 'monitor' ? 'active' : ''} 
          onClick={() => setActiveTab('monitor')}
        >
          📍 实时监测
        </button>
        <button 
          className={activeTab === 'health' ? 'active' : ''} 
          onClick={() => setActiveTab('health')}
        >
          💓 健康记录
        </button>
        <button 
          className={activeTab === 'chat' ? 'active' : ''} 
          onClick={() => setActiveTab('chat')}
        >
          💬 AI沟通助手
        </button>
        <button 
          className={activeTab === 'knowledge' ? 'active' : ''} 
          onClick={() => setActiveTab('knowledge')}
        >
          📚 护理知识
        </button>
        <button 
          className={activeTab === 'services' ? 'active' : ''} 
          onClick={() => setActiveTab('services')}
        >
          🛎️ 家政服务
        </button>
        <button 
          className={activeTab === 'profile' ? 'active' : ''} 
          onClick={() => setActiveTab('profile')}
        >
          👤 个人中心
        </button>
      </div>

      {/* 内容区域 */}
      <div className="dashboard-content">
        {activeTab === 'monitor' && (
          <div className="monitor-tab">
            <h2>老年人实时监测</h2>
            <div className="elderly-card">
              <div className="elderly-info">
                <div className="avatar">👴</div>
                <div className="info">
                  <h3>{elderlyData.name} ({elderlyData.age}岁)</h3>
                  <p>📍 位置: {elderlyData.location}</p>
                  <p>😊 心情: {elderlyData.mood}</p>
                </div>
              </div>
              
              <div className="health-stats">
                <div className="stat-item">
                  <span className="label">心率</span>
                  <span className="value">{elderlyData.heartRate} bpm</span>
                </div>
                <div className="stat-item">
                  <span className="label">血压</span>
                  <span className="value">{elderlyData.bloodPressure}</span>
                </div>
                <div className="stat-item">
                  <span className="label">最后更新</span>
                  <span className="value">{elderlyData.lastUpdate}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn-primary">📞 视频通话</button>
                <button className="btn-secondary">📱 发送消息</button>
                <button className="btn-warning">🚨 紧急求助</button>
              </div>
            </div>

            <div className="location-map">
              <h3>实时位置地图</h3>
              <div className="map-placeholder">
                <p>🗺️ 地图显示功能</p>
                <p>实时显示老人位置轨迹</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="health-tab">
            <h2>健康记录追踪</h2>
            <div className="health-summary">
              <div className="summary-card">
                <h4>今日健康状态</h4>
                <p className="status-good">✅ 一切正常</p>
              </div>
              <div className="summary-card">
                <h4>最近测量</h4>
                <p>血压: 125/80 mmHg</p>
                <p>血糖: 6.2 mmol/L</p>
              </div>
            </div>

            <div className="health-records">
              <h3>历史记录</h3>
              <div className="records-list">
                {healthRecords.map((record, index) => (
                  <div key={index} className="record-item">
                    <div className="record-date">{record.date}</div>
                    <div className="record-type">{record.type}</div>
                    <div className="record-value">{record.value}</div>
                    <div className="record-status">{record.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="chat-tab">
            <div className="conversation-layout">
              {/* 主对话区域 */}
              <div className="main-chat">
                <div className="chat-header">
                  <div className="chat-status">
                    <h3>{isYoungRole ? '👴 与爸妈的对话' : '👦 与子女的对话'}</h3>
                    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                      <span className="status-dot"></span>
                      {isConnected ? '实时连接中' : '连接断开'}
                    </div>
                  </div>
                  <button 
                    onClick={startExampleConversation}
                    className="example-btn"
                  >
                    💬 示例对话
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
                    placeholder={isYoungRole ? "回复爸妈..." : "回复子女..."}
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

              {/* AI建议侧边栏 */}
              <div className="ai-suggestions-sidebar">
                <div className="sidebar-header">
                  <h4>🤖 AI助手提示</h4>
                  <span className="badge">{aiSuggestions.length}</span>
                </div>
                
                {aiSuggestions.length > 0 ? (
                  <div className="suggestions-list">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className={`suggestion-card ${suggestion.urgency}`}>
                        <div className="suggestion-header">
                          <span className="suggestion-icon">{suggestion.title.split(' ')[0]}</span>
                          <span className="suggestion-title">{suggestion.title}</span>
                        </div>
                        <div className="suggestion-content">
                          {suggestion.content.split('\n').map((line, i) => (
                            <p key={i} className="suggestion-line">{line}</p>
                          ))}
                        </div>
                        <div className="suggestion-footer">
                          <span className="urgency-tag">
                            {suggestion.urgency === 'high' ? '⚠️ 高优先级' : 
                             suggestion.urgency === 'medium' ? '🔶 中等优先级' : '💡 一般建议'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-suggestions">
                    <div className="placeholder-icon">💭</div>
                    <p>AI助手正在分析对话...</p>
                    <small>当检测到健康或情绪相关关键词时，这里会显示专业建议</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="knowledge-tab">
            <h2>老年人护理知识库</h2>
            <div className="knowledge-grid">
              {knowledgeArticles.map((article, index) => (
                <div key={index} className="knowledge-card">
                  <div className="category-badge">{article.category}</div>
                  <h4>{article.title}</h4>
                  <p>了解如何更好地照顾长辈，提升生活质量...</p>
                  <button className="read-btn">阅读全文</button>
                </div>
              ))}
            </div>

            <div className="emergency-guide">
              <h3>🆘 紧急情况处理指南</h3>
              <div className="guide-list">
                <div className="guide-item">
                  <h4>心脏骤停</h4>
                  <p>立即拨打120，进行心肺复苏</p>
                </div>
                <div className="guide-item">
                  <h4>跌倒受伤</h4>
                  <p>不要随意移动，先检查伤势</p>
                </div>
                <div className="guide-item">
                  <h4>突发疾病</h4>
                  <p>保持冷静，立即联系医疗机构</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="services-tab">
            <h2>家政服务平台</h2>
            <div className="services-grid">
              {housekeepingServices.map((service, index) => (
                <div key={index} className="service-card">
                  <h4>{service.name}</h4>
                  <div className="price">{service.price}</div>
                  <div className="rating">⭐ {service.rating}</div>
                  <button className="book-btn">立即预约</button>
                </div>
              ))}
            </div>

            <div className="service-categories">
              <h3>服务分类</h3>
              <div className="category-list">
                <button>日常保洁</button>
                <button>专业护理</button>
                <button>餐饮服务</button>
                <button>医疗陪护</button>
                <button>康复理疗</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h2>年轻人个人中心</h2>
            <div className="profile-card">
              <div className="avatar">👦</div>
              <div className="profile-info">
                <h3>李小明</h3>
                <p>📧 liming@example.com</p>
                <p>📱 138****1234</p>
                <p>👴 关联老人: 张老先生</p>
              </div>
            </div>

            <div className="profile-actions">
              <h3>账户设置</h3>
              <div className="action-list">
                <button>📋 编辑个人信息</button>
                <button>🔒 修改密码</button>
                <button>🔔 通知设置</button>
                <button>🎨 主题设置</button>
                <button>❓ 帮助中心</button>
                <button onClick={handleLogout}>🚪 退出登录</button>
              </div>
            </div>

            <div className="stats">
              <h3>关爱统计</h3>
              <div className="stats-grid">
                <div className="stat">
                  <div className="number">28</div>
                  <div className="label">关爱天数</div>
                </div>
                <div className="stat">
                  <div className="number">156</div>
                  <div className="label">沟通次数</div>
                </div>
                <div className="stat">
                  <div className="number">12</div>
                  <div className="label">服务预约</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部宣传语 */}
      <div className="footer-promotion">
        <div className="promotion-content">
          <h3>❤️ 关爱老人，温暖相伴</h3>
          <div className="promotion-slogans">
            <p>"用心呵护每一位长辈的幸福晚年"</p>
            <p>"让关爱成为最美的陪伴"</p>
            <p>"孝心传递，温暖永驻"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoungDashboardPage;