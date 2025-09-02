import { WebSocketServer } from 'ws';

// 创建WebSocket服务器，监听3001端口
const wss = new WebSocketServer({ port: 3001 });

// 存储所有连接的客户端
const clients = new Set();

console.log('WebSocket服务器启动在 ws://localhost:3001');

wss.on('connection', function connection(ws) {
  console.log('新的客户端连接');
  clients.add(ws);
  
  // 向新连接的客户端发送欢迎消息
  ws.send(JSON.stringify({
    type: 'system',
    data: {
      message: '连接成功！可以开始聊天了',
      timestamp: new Date().toISOString()
    }
  }));
  
  // 广播给所有客户端有新用户加入
  broadcast({
    type: 'user_joined',
    data: {
      message: '有新用户加入聊天',
      timestamp: new Date().toISOString()
    }
  }, ws);
  
  // 处理接收到的消息
  ws.on('message', function message(data) {
    try {
      const parsedData = JSON.parse(data);
      console.log('收到消息:', parsedData);
      
      // 广播消息给所有客户端（除了发送者）
      broadcast(parsedData, ws);
    } catch (error) {
      console.error('消息解析错误:', error);
    }
  });
  
  // 处理连接关闭
  ws.on('close', function close() {
    console.log('客户端断开连接');
    clients.delete(ws);
    
    // 广播用户离开消息
    broadcast({
      type: 'user_left',
      data: {
        message: '有用户离开聊天',
        timestamp: new Date().toISOString()
      }
    });
  });
  
  // 处理错误
  ws.on('error', function error(err) {
    console.error('WebSocket错误:', err);
  });
});

// 广播消息给所有客户端（可选排除某个客户端）
function broadcast(message, excludeClient = null) {
  const messageStr = JSON.stringify(message);
  clients.forEach(client => {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

// 处理服务器关闭
wss.on('close', function close() {
  console.log('WebSocket服务器关闭');
});