import React, { useState, useEffect, useRef } from 'react';
import './FamilyCommunicationPage.css';

// 模拟家庭成员数据
const familyContacts = [
  { id: 1, name: '儿子-王五', avatar: '/avatar3.jpg', lastMessage: '爸，今天工作忙，晚一点回家吃饭', lastTime: '19:30' },
  { id: 2, name: '女儿-赵六', avatar: '/avatar4.jpg', lastMessage: '妈，周末我带孩子来看你们', lastTime: '昨天' },
  { id: 3, name: '孙子-小宝', avatar: '/avatar5.jpg', lastMessage: '爷爷奶奶，我想你们了', lastTime: '前天' },
];

const chatHistories = {
  1: [
    { id: 1, sender: 'other', content: '爸，今天工作忙，晚一点回家吃饭', time: '19:30', emotion: 'neutral' },
    { id: 2, sender: 'me', content: '好的，路上注意安全', time: '19:32', emotion: 'care' },
    { id: 3, sender: 'other', content: '嗯', time: '19:35', emotion: 'busy' },
  ],
  2: [
    { id: 1, sender: 'other', content: '妈，周末我带孩子来看你们', time: '昨天', emotion: 'happy' },
    { id: 2, sender: 'me', content: '太好了，我们准备你们爱吃的菜', time: '昨天', emotion: 'happy' },
  ],
  3: [
    { id: 1, sender: 'other', content: '爷爷奶奶，我想你们了', time: '前天', emotion: 'miss' },
    { id: 2, sender: 'me', content: '爷爷奶奶也想小宝，周末让爸爸妈妈带你来', time: '前天', emotion: 'love' },
    { id: 3, sender: 'other', content: '爷爷，你最近身体怎么样？', time: '今天', emotion: 'concern' },
    { id: 4, sender: 'me', content: '都挺好的，你不用管我', time: '今天', emotion: 'conceal' },
  ],
};

// 情绪分析和AI提示的模拟函数
const analyzeEmotionAndSuggest = (message, messageType = 'normal') => {
  // 简单的关键词匹配来模拟情绪分析
  const keywords = {
    '生气': { emotion: 'angry', suggestion: '看起来对方情绪不太好，或许可以先关心一下他们最近的情况？' },
    '难过': { emotion: 'sad', suggestion: '对方可能感到难过，给予安慰和支持会让他们好受一些。' },
    '想你': { emotion: 'miss', suggestion: '对方表达了思念之情，及时回应并表达同样的感受会让他们很开心。' },
    '累': { emotion: 'tired', suggestion: '对方可能感到疲惫，关心他们的休息情况，提醒他们注意身体。' },
    '忙': { emotion: 'busy', suggestion: '对方现在可能比较忙碌，简单的关心和理解比追问更贴心。' },
    '开心': { emotion: 'happy', suggestion: '对方现在心情不错，和他们分享一些积极的事情吧！' },
    '病': { emotion: 'sick', suggestion: '对方可能身体不适，表达关心并询问是否需要帮助。' },
    '挺好的': { emotion: 'conceal', suggestion: '老人说"挺好的"，但可能有心事，可以多问一句具体情况哦~' },
    '没问题': { emotion: 'conceal', suggestion: '老人说"没问题"，但也许是不想让你担心，可以再关心一下细节。' },
    '不用管我': { emotion: 'conceal', suggestion: '老人说"不用管我"，这时候更需要你的关心，试着多聊聊吧~' },
    '都好': { emotion: 'conceal', suggestion: '老人说"都好"，可能只是不想让你担心，不妨主动分享点你的生活。' },
  };

  // 检查消息中是否包含关键词
  for (const [keyword, result] of Object.entries(keywords)) {
    if (message.includes(keyword)) {
      return result;
    }
  }

  // AI情感调解小助手：检测忙碌/简单回复
  if (messageType === 'reply' && (message.length < 10 || message.includes('嗯') || message.includes('哦') || message.includes('知道了') || message.includes('好的') || message.includes('行'))) {
    return { 
      emotion: 'busy_reply', 
      suggestion: '看来您可能比较忙碌，我帮您补充一句更贴心的回复吧？这样长辈会感受到您的关心。' 
    };
  }

  // 默认返回
  return { emotion: 'neutral', suggestion: '' };
};

// AI情感调解小助手组件
const AIAssistant = ({ suggestion, emotion, onUseSuggestion }) => {
  const assistantMessages = {
    'busy_reply': '我理解您工作繁忙，要不要用这句回复让长辈感受到您的关心？"爸妈，今天工作有点忙，等我忙完了好好和你们聊聊，你们先休息好~"',
    'conceal': '长辈可能有心事不想让您担心，您可以这样回复："爸妈，有什么事都可以和我说，我们一起想办法，别一个人憋着。"'
  };

  const assistantMessage = assistantMessages[emotion] || '';

  if (!suggestion) return null;

  return (
    <div className={`ai-assistant ${emotion}`}>
      <div className="ai-header">
        <div className="ai-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h4 className="ai-title">情感调解小助手</h4>
      </div>
      <p className="assistant-suggestion">{suggestion}</p>
      {assistantMessage && (
        <div className="assistant-message">
          <p>{assistantMessage}</p>
          <button className="use-suggestion-btn" onClick={() => onUseSuggestion(assistantMessage)}>
            使用这个回复
          </button>
        </div>
      )}
    </div>
  );
};

const FamilyCommunicationPage = () => {
  const [selectedContact, setSelectedContact] = useState(familyContacts[0]);
  const [messages, setMessages] = useState(chatHistories[1]);
  const [newMessage, setNewMessage] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiEmotion, setAiEmotion] = useState('');
  const messagesEndRef = useRef(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [wallpaperUrl, setWallpaperUrl] = useState('');
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);
  const fileInputRef = useRef(null);

  // 切换联系人时加载对应的聊天历史
  useEffect(() => {
    setMessages(chatHistories[selectedContact.id] || []);
  }, [selectedContact]);

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 分析输入消息的情绪并给出建议
  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewMessage(value);
    
    // 当输入一定长度时触发情绪分析
    if (value.length > 5) {
      const result = analyzeEmotionAndSuggest(value);
      setAiSuggestion(result.suggestion);
      setAiEmotion(result.emotion);
      setShowSuggestion(result.suggestion !== '');
    } else {
      setShowSuggestion(false);
    }
  };

  // 使用AI助手的建议回复
  const handleUseSuggestion = (suggestedMessage) => {
    setNewMessage(suggestedMessage);
    setShowAssistant(false);
  };

  // 检查并处理收到的消息，识别忙碌回复或隐瞒情况
  useEffect(() => {
    // 只处理最新的收到的消息
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      // 检查是否是收到的消息并且是新添加的
      if (lastMessage.sender === 'other' && lastMessage.id > messages.length - 2) {
        const result = analyzeEmotionAndSuggest(lastMessage.content, 'reply');
        if (result.suggestion) {
          setAiSuggestion(result.suggestion);
          setAiEmotion(result.emotion);
          setShowAssistant(true);
          
          // 3秒后自动隐藏
          const timer = setTimeout(() => {
            setShowAssistant(false);
          }, 8000);
          
          return () => clearTimeout(timer);
        }
      }
    }
  }, [messages]);

  // 发送消息
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      emotion: 'neutral',
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setShowSuggestion(false);
  };

  // 按Enter发送消息
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 打开壁纸选择器
  const openWallpaperSelector = () => {
    setShowWallpaperSelector(true);
  };

  // 关闭壁纸选择器
  const closeWallpaperSelector = () => {
    setShowWallpaperSelector(false);
  };

  // 选择文件
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  // 处理文件上传
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setWallpaperUrl(event.target.result);
        // 保存到本地存储
        localStorage.setItem('familyChatWallpaper', event.target.result);
        closeWallpaperSelector();
      };
      reader.readAsDataURL(file);
    }
  };

  // 移除壁纸
  const removeWallpaper = () => {
    setWallpaperUrl('');
    localStorage.removeItem('familyChatWallpaper');
    closeWallpaperSelector();
  };

  // 从本地存储加载壁纸
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('familyChatWallpaper');
    if (savedWallpaper) {
      setWallpaperUrl(savedWallpaper);
    }
  }, []);

  return (
    <div className="family-communication-page" style={wallpaperUrl ? { backgroundImage: `url(${wallpaperUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
      <div className="page-header">
        <h2 className="page-title">家庭沟通</h2>
        <button className="settings-button" onClick={openWallpaperSelector}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>
      
      <div className="communication-container">
        {/* 联系人列表 */}
        <div className="contacts-panel">
          <h3 className="panel-title">家庭成员</h3>
          <div className="contacts-list">
            {familyContacts.map((contact) => (
              <div
                key={contact.id}
                className={`contact-item ${selectedContact.id === contact.id ? 'selected' : ''}`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="contact-avatar"></div>
                <div className="contact-info">
                  <h4 className="contact-name">{contact.name}</h4>
                  <p className="contact-message">{contact.lastMessage}</p>
                </div>
                <div className="contact-time">{contact.lastTime}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 聊天区域 */}
        <div className="chat-panel">
          {/* 聊天头部 */}
          <div className="chat-header">
            <div className="chat-contact">
              <div className="chat-avatar"></div>
              <h3 className="chat-contact-name">{selectedContact.name}</h3>
            </div>
            <div className="chat-actions">
              <button className="action-button video-call">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="15" x="2" y="4" rx="2" ry="2"></rect>
                  <polygon points="10 9 15 12 10 15 10 9"></polygon>
                </svg>
                视频通话
              </button>
              <button className="action-button voice-call">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                语音通话
              </button>
              <button className="action-button settings-small" onClick={openWallpaperSelector}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* 聊天内容 */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
              >
                <div className="message-content">{message.content}</div>
                <div className="message-time">{message.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* AI情感调解小助手 */}
          {showAssistant && (
            <AIAssistant 
              suggestion={aiSuggestion} 
              emotion={aiEmotion} 
              onUseSuggestion={handleUseSuggestion}
            />
          )}

          {/* AI助手建议 */}
          {showSuggestion && !showAssistant && (
            <div className="ai-suggestion">
              <div className="ai-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <p className="suggestion-text">{aiSuggestion}</p>
            </div>
          )}

          {/* 消息输入区域 */}
          <div className="chat-input">
            <textarea
              className="message-input"
              placeholder="输入消息..."
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              rows="1"
            />
            <button className="send-button" onClick={handleSendMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              发送
            </button>
          </div>
        </div>
      </div>
      
      {/* 壁纸选择器 */}
      {showWallpaperSelector && (
        <div className="wallpaper-selector-overlay">
          <div className="wallpaper-selector">
            <div className="wallpaper-selector-header">
              <h3>更换聊天背景</h3>
              <button className="close-button" onClick={closeWallpaperSelector}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="wallpaper-selector-content">
              <p>选择一张照片作为聊天背景</p>
              <div className="wallpaper-preview">
                {wallpaperUrl ? (
                  <div className="current-wallpaper">
                    <img src={wallpaperUrl} alt="Current wallpaper" />
                    <button className="remove-wallpaper-btn" onClick={removeWallpaper}>
                      移除壁纸
                    </button>
                  </div>
                ) : (
                  <div className="no-wallpaper">
                    <p>暂无背景壁纸</p>
                  </div>
                )}
              </div>
              <button className="select-wallpaper-btn" onClick={handleFileSelect}>
                从相册选择图片
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyCommunicationPage;