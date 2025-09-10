import React, { useState, useEffect, useRef } from 'react';
import './FamilyGroupChat.css';

// 模拟家庭成员数据
const familyMembers = [
  { id: 'son', name: '儿子-王五', avatar: '/avatar3.jpg', isOnline: true },
  { id: 'daughter', name: '女儿-赵六', avatar: '/avatar4.jpg', isOnline: false },
  { id: 'grandson', name: '孙子-小宝', avatar: '/avatar5.jpg', isOnline: true }
];



// AI调解逻辑
const generateAIResponse = (message, senderInfo, conversationContext) => {
  const { content, emotion, senderId } = message;
  const responses = {
    // 当家人唠叨时的调解
    nagging_mediation: [
      `我理解${senderInfo.name}对您的关心。虽然听起来像是在唠叨，但这其实是爱的表现。${senderInfo.name}是因为担心您才会这样说的。`,
      `${senderInfo.name}的话可能听起来有些重复，但请理解这是因为他们真的很在乎您。让我们一起想想如何更好地沟通吧。`,
      `我知道被反复提醒可能会让您感到不耐烦，但${senderInfo.name}这样做是出于对您的爱护。我们可以找到更温和的沟通方式。`
    ],
    
    // 当老人情绪激动时的调解
    elder_upset: [
      '我理解您现在的感受。家人的关心有时候确实会让人感到压力，但请相信他们的出发点是好的。',
      '您的感受是完全可以理解的。让我们冷静一下，听听彼此的想法，找到大家都能接受的解决方案。',
      '我知道您可能觉得被过度关注了，但这恰恰说明了家人对您的重视。让我们换个角度来看这个问题。'
    ],
    
    // 当家人担心时的调解
    family_worry: [
      '我理解您对长辈的担心，这份关心很珍贵。不过，我们可以用更温和的方式来表达关爱，这样长辈更容易接受。',
      '您的担心是可以理解的，但过于频繁的提醒可能会让长辈感到压力。让我们想想其他的关爱方式。',
      '关心长辈是好事，但方式很重要。我们可以尝试用更积极正面的语言来表达关爱。'
    ],
    
    // 提供解决方案
    solution_suggestion: [
      '让我们一起想个解决办法：我们可以设置温馨的提醒，而不是反复的叮嘱。',
      '我建议我们制定一个家庭关爱计划，既能照顾到长辈的需求，又能减少沟通中的摩擦。',
      '不如我们换个思路：用鼓励和支持代替担心和催促，这样效果可能会更好。'
    ]
  };
  
  // 检测消息类型并生成相应回复
  if (content.includes('又') || content.includes('怎么') || content.includes('说了') || content.includes('要')) {
    // 检测到唠叨语气
    return {
      type: 'nagging_mediation',
      content: responses.nagging_mediation[Math.floor(Math.random() * responses.nagging_mediation.length)],
      mediationType: 'explain_concern'
    };
  }
  
  if (senderId === 'user' && (emotion === 'defensive' || emotion === 'annoyed')) {
    // 老人情绪激动
    return {
      type: 'elder_upset',
      content: responses.elder_upset[Math.floor(Math.random() * responses.elder_upset.length)],
      mediationType: 'calm_emotion'
    };
  }
  
  if (emotion === 'worried' || emotion === 'anxious') {
    // 家人担心
    return {
      type: 'family_worry',
      content: responses.family_worry[Math.floor(Math.random() * responses.family_worry.length)],
      mediationType: 'guide_communication'
    };
  }
  
  // 默认提供解决方案
  return {
    type: 'solution_suggestion',
    content: responses.solution_suggestion[Math.floor(Math.random() * responses.solution_suggestion.length)],
    mediationType: 'suggest_solution'
  };
};

// 情绪分析函数
const analyzeEmotion = (message) => {
  const keywords = {
    worried: ['担心', '怎么', '又', '说了', '要', '必须', '应该'],
    defensive: ['知道了', '我知道', '别说了', '烦', '够了'],
    annoyed: ['烦', '唠叨', '够了', '别管', '不用'],
    caring: ['关心', '爱', '担心', '希望', '为了你好'],
    anxious: ['着急', '担心', '害怕', '不放心']
  };
  
  for (const [emotion, words] of Object.entries(keywords)) {
    if (words.some(word => message.includes(word))) {
      return emotion;
    }
  }
  
  return 'neutral';
};

const FamilyGroupChat = () => {
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [aiMediationEnabled, setAiMediationEnabled] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const sendButtonRef = useRef(null);
  const ws = useRef(null);
  
  // 为每个家庭成员创建独立的聊天历史
  const [chatHistories, setChatHistories] = useState({
    son: [
      {
        id: 1,
        senderId: 'son',
        senderName: '儿子-王五',
        content: '爸，你怎么又不按时吃药了？医生说了要按时服药的！',
        time: '14:30',
        emotion: 'worried',
        isNagging: true
      },
      {
        id: 2,
        senderId: 'ai',
        senderName: 'AI调解助手',
        content: '我理解王五对爸爸健康的关心。爸爸，王五的话虽然听起来有些严厉，但这是因为他真的很担心您的身体。按时吃药确实很重要哦~',
        time: '14:31',
        emotion: 'mediating',
        isAI: true,
        mediationType: 'explain_concern'
      }
    ],
    daughter: [
      {
        id: 1,
        senderId: 'daughter',
        senderName: '女儿-赵六',
        content: '爸，你怎么又不接我电话？我很担心你！',
        time: '15:20',
        emotion: 'worried',
        isNagging: true
      }
    ],
    grandson: [
      {
        id: 1,
        senderId: 'grandson',
        senderName: '孙子-小宝',
        content: '爷爷，你最近身体怎么样？',
        time: '16:10',
        emotion: 'concern'
      }
    ]
  });
  
  // WebSocket连接和消息处理
  useEffect(() => {
    // 连接到WebSocket服务器
    const connectWebSocket = () => {
      try {
        // 连接到本地WebSocket服务器
        ws.current = new WebSocket('ws://localhost:3001');
        
        ws.current.onopen = () => {
          setIsConnected(true);
          console.log('WebSocket连接成功 - 家庭沟通');
          
          // 发送用户身份信息
          ws.current.send(JSON.stringify({
            type: 'user_join',
            data: {
              userId: 'user',
              userName: '我',
              userType: 'elder'
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
      case 'family_message':
        // 检查消息是否属于当前用户的对话
        const isRelevantMessage = 
          data.data.senderId === 'user' ||
          data.data.receiverId === 'user' ||
          data.data.receiverId === selectedMember.id ||
          data.data.senderId === selectedMember.id;
        
        if (isRelevantMessage) {
          const newMsg = {
            id: messages.length + 1,
            senderId: data.data.senderId,
            senderName: data.data.senderName,
            content: data.data.content,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            emotion: data.data.emotion || 'neutral'
          };
          
          const updatedMessages = [...messages, newMsg];
          setMessages(updatedMessages);
          
          // 更新对应家庭成员的聊天历史
          setChatHistories(prev => ({
            ...prev,
            [selectedMember.id]: updatedMessages
          }));
        }
        break;
        
      case 'user_join':
        console.log('用户加入:', data.data);
        break;
        
      default:
        console.log('收到未知类型的消息:', data);
    }
  };

  // 切换家庭成员时加载对应的聊天历史
  useEffect(() => {
    setMessages(chatHistories[selectedMember.id] || []);
  }, [selectedMember, chatHistories]);
  
  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // AI自动调解功能
  useEffect(() => {
    if (!aiMediationEnabled) return;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isAI && lastMessage.senderId !== 'user') {
      // 检测是否需要AI调解
      const emotion = analyzeEmotion(lastMessage.content);
      const senderInfo = familyMembers.find(member => member.id === lastMessage.senderId);
      
      if (['worried', 'anxious'].includes(emotion) || lastMessage.isNagging) {
        // 延迟1-2秒后AI介入
        const delay = Math.random() * 1000 + 1000;
        setTimeout(() => {
          setIsTyping(true);
          
          setTimeout(() => {
            const aiResponse = generateAIResponse(lastMessage, senderInfo, messages);
            const aiMessage = {
              id: messages.length + 1,
              senderId: 'ai',
              senderName: 'AI调解助手',
              content: aiResponse.content,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              emotion: 'mediating',
              isAI: true,
              mediationType: aiResponse.mediationType
            };
            
            const updatedMessagesWithAI = [...messages, aiMessage];
            setMessages(updatedMessagesWithAI);
            
            // 更新对应家庭成员的聊天历史
            setChatHistories(prev => ({
              ...prev,
              [selectedMember.id]: updatedMessagesWithAI
            }));
            
            setIsTyping(false);
          }, 2000);
        }, delay);
      }
    }
  }, [messages, aiMediationEnabled]);
  
  // 发送消息
  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || isSending) return;
    
    // 开始发送动画
    setIsSending(true);
    if (sendButtonRef.current) {
      sendButtonRef.current.classList.add('sending');
    }
    
    const emotion = analyzeEmotion(newMessage);
    const newMsg = {
      id: messages.length + 1,
      senderId: 'user',
      senderName: '我',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      emotion: emotion
    };
    
    // 通过WebSocket发送消息
    if (isConnected && ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'family_message',
        data: {
          senderId: 'user',
          senderName: '我',
          senderType: 'elder',
          receiverId: selectedMember.id,
          receiverName: selectedMember.name,
          receiverType: 'family',
          content: newMessage,
          emotion: emotion,
          timestamp: new Date().toISOString()
        }
      }));
    }
    
    // 模拟发送延迟
    setTimeout(() => {
      const updatedMessages = [...messages, newMsg];
      setMessages(updatedMessages);
      
      // 更新对应家庭成员的聊天历史
      setChatHistories(prev => ({
        ...prev,
        [selectedMember.id]: updatedMessages
      }));
      
      setNewMessage('');
      setIsSending(false);
      
      // 移除发送动画
      if (sendButtonRef.current) {
        sendButtonRef.current.classList.remove('sending');
      }
    }, 300);
  };
  
  // 按Enter发送消息
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // 模拟其他家庭成员发送消息
  const simulateFamilyMessage = (memberId, content, isNagging = false) => {
    // 如果不是当前选中的成员，先切换到该成员
    if (memberId !== selectedMember.id) {
      const member = familyMembers.find(m => m.id === memberId);
      setSelectedMember(member);
    }
    
    const member = familyMembers.find(m => m.id === memberId);
    const emotion = analyzeEmotion(content);
    const currentMessages = chatHistories[memberId] || [];
    
    const message = {
      id: currentMessages.length + 1,
      senderId: memberId,
      senderName: member.name,
      content: content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      emotion: emotion,
      isNagging: isNagging
    };
    
    const updatedMessages = [...currentMessages, message];
    
    // 通过WebSocket发送模拟消息
    if (isConnected && ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'family_message',
        data: {
          senderId: memberId,
          senderName: member.name,
          senderType: 'family',
          receiverId: 'user',
          receiverName: '我',
          receiverType: 'elder',
          content: content,
          emotion: emotion,
          isNagging: isNagging,
          timestamp: new Date().toISOString()
        }
      }));
    }
    
    // 更新聊天历史
    setChatHistories(prev => ({
      ...prev,
      [memberId]: updatedMessages
    }));
    
    // 如果是当前选中的成员，同时更新当前消息
    if (memberId === selectedMember.id) {
      setMessages(updatedMessages);
    }
  };
  
  return (
    <div className="family-group-chat">
      <div className="page-header">
        <h2 className="page-title">AI家庭群聊</h2>
        <div className="chat-controls">
          <label className="ai-toggle">
            <input 
              type="checkbox" 
              checked={aiMediationEnabled}
              onChange={(e) => setAiMediationEnabled(e.target.checked)}
            />
            <span>AI调解助手</span>
          </label>
        </div>
      </div>
      
      <div className="communication-container">
        {/* 联系人列表 */}
        <div className="contacts-panel">
          <h3 className="panel-title">家庭成员</h3>
          <div className="contacts-list">
            {familyMembers.map(member => (
              <div 
                key={member.id} 
                className={`contact-item ${
                  selectedMember.id === member.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="contact-avatar"></div>
                <div className="contact-info">
                  <h4 className="contact-name">{member.name}</h4>
                  <p className="contact-message">
                    {member.isOnline ? '在线' : '离线'} • 
                    {chatHistories[member.id] && chatHistories[member.id].length > 0 
                      ? `${chatHistories[member.id].length} 条消息` 
                      : '暂无消息'
                    }
                  </p>
                </div>
                <div className="contact-time">
                  {member.isOnline ? '🟢' : '⚫'}
                </div>
              </div>
            ))}
          </div>
          
          {/* 当前聊天参与者 */}
          <div className="chat-participants">
            <div className="participant">
              <span className="participant-avatar">👨‍💼</span>
              <span className="participant-name">您</span>
            </div>
            <div className="participant">
              <span className="participant-avatar">👤</span>
              <span className="participant-name">{selectedMember.name}</span>
            </div>
            <div className="participant">
              <span className="participant-avatar">🤖</span>
              <span className="participant-name">AI调解助手</span>
            </div>
          </div>
        </div>
      
      {/* 聊天区域 */}
       <div className="chat-panel">
         {/* 聊天头部 */}
         <div className="chat-header">
           <div className="chat-contact">
             <div className="chat-avatar"></div>
             <h3 className="chat-contact-name">与 {selectedMember.name} 的聊天</h3>
           </div>
           <div className="chat-actions">
             <div className="action-button">
               <span>您 + {selectedMember.name} + AI助手</span>
             </div>
           </div>
         </div>
         
         {/* 聊天消息区域 */}
         <div className="chat-messages">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === 'user';
          const isAI = message.isAI;
          
          return (
            <div
              key={message.id}
              className={`message-wrapper ${
                isCurrentUser ? 'sent' : isAI ? 'ai-message' : 'received'
              }`}
            >
              {!isCurrentUser && (
                <div className="message-sender">
                  <div className="sender-avatar">
                    {isAI ? '🤖' : '👤'}
                  </div>
                  <span className="sender-name">{message.senderName}</span>
                </div>
              )}
              
              <div className={`message-bubble ${
                isCurrentUser ? 'sent' : isAI ? 'ai-bubble' : message.emotion
              }`}>
                <div className="message-content">{message.content}</div>
                <div className="message-time">{message.time}</div>
                
                {isAI && (
                  <div className="ai-badge">
                    <span>🤖 AI调解</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* AI正在输入指示器 */}
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-avatar">🤖</div>
            <div className="typing-bubble">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* 消息输入区域 */}
      <div className="chat-input">
        <textarea
          className="message-input"
          placeholder="输入消息..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="1"
        />
        <button 
          ref={sendButtonRef}
          className={`send-button ${isSending ? 'sending' : ''}`}
          onClick={handleSendMessage}
          disabled={isSending || newMessage.trim() === ''}
          title={isSending ? '发送中...' : '发送消息'}
        >
          {isSending ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          )}
        </button>
        </div>
        </div>
       </div>
      
      {/* 快速测试按钮 */}
      <div className="test-buttons">
        <button 
          className="test-btn"
          onClick={() => simulateFamilyMessage('son', '爸，你又忘记吃药了！医生说了要按时服药的！', true)}
        >
          模拟儿子唠叨
        </button>
        <button 
          className="test-btn"
          onClick={() => simulateFamilyMessage('daughter', '爸，你怎么又不接我电话？我很担心你！', true)}
        >
          模拟女儿担心
        </button>
      </div>
    </div>
  );
};

export default FamilyGroupChat;