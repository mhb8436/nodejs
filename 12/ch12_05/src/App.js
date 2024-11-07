import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// Socket.io 서버에 연결
const socket = io("http://localhost:3030/",{
  withCredentials: true,
}); // 서버와 연결


function App() {
  const [messages, setMessages] = useState([]);  // 메시지 목록
  const [message, setMessage] = useState('');     // 입력된 메시지

  useEffect(() => {
    // 서버로부터 'chat message' 이벤트를 받을 때
    socket.on('chat:message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);      
    });

    // 클린업: 컴포넌트가 언마운트 될 때 socket 연결 해제
    return () => {
      socket.off('chat:message');
    };
  }, []);

  // 메시지 전송 처리
  const sendMessage = (e) => {
    if (message.trim()) {      
      socket.emit('chat:message', message);
      setMessage('');  // 입력창 초기화
    }
  };

  return (
    <div>
      <h1>Message List</h1>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <h1>Send Message</h1>
      <input
        id="input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete="off"
      />
      <button onClick={sendMessage}>Send</button>      
    </div>
  );
}

export default App;
