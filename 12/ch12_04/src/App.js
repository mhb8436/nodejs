// App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io("http://localhost:3030/",{
  withCredentials: true,
}); // 서버와 연결

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {    
    // 로그인 성공 시
    socket.on('login:success', (data) => {
      setIsLoggedIn(true);
      setRooms(data.rooms);
    });

    // 새로운 방 생성 시
    socket.on('room:created', (room) => {
      setRooms((prevRooms) => [...prevRooms, room]);
    });

    // 방에 입장 성공 시
    socket.on('room:joined', (room) => {
      alert(`Joined room: ${room}`);
      setCurrentRoom(room);
    });

    // 방 업데이트 시
    socket.on('update:rooms', (updatedRooms) => {
      setRooms(updatedRooms);
    });

    // 사용자 목록 업데이트 시
    socket.on('update:users', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    // 채팅 메시지 수신 시
    socket.on('chat:message', (data) => {
      console.log(data);
      setChatMessages((prevMessages) => [...prevMessages, `${data.user}: ${data.message}`]);
    });

    // 사용자가 방에 들어왔을 때
    socket.on('user:joined', (user) => {
      setChatMessages((prevMessages) => [...prevMessages, `${user} joined the room`]);
    });

    // 사용자가 방을 나갔을 때
    socket.on('user:left', (user) => {
      setChatMessages((prevMessages) => [...prevMessages, `${user} left the chat`]);
    });

    return () => {
      socket.off('chat:message');
      socket.off('user:joined');
      socket.off('user:left');
      socket.off('room:joined');      
    };
  }, []);

  // 로그인 핸들러
  const handleLogin = () => {
    if (username) {
      socket.emit('login', username);
    }
  };

  // 방 생성 핸들러
  const handleCreateRoom = () => {
    if (roomName) {
      socket.emit('create:room', roomName);
      setRoomName('');
    }
  };

  // 방 입장 핸들러
  const handleJoinRoom = (room) => {
    setCurrentRoom(room);
    socket.emit('join:room', room);
  };

  // 메시지 전송 핸들러
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message && currentRoom) {
      console.log(message, currentRoom);
      socket.emit('chat:message', { room: currentRoom, message });
      setMessage('');
    }
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="login">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="chat-container">
          <div className="create-room">
            <h2>Create Room</h2>
            <input
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button onClick={handleCreateRoom}>Create Room</button>
          </div>

          <div className="rooms">
            <h2>Rooms</h2>
            <ul>
              {rooms.map((room, index) => (
                <li key={index} type="button" onClick={() => handleJoinRoom(room)}>
                  {room}
                </li>
              ))}
            </ul>
          </div>

          <div className="users">
            <h2>Users</h2>
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
          <div className="currentRoom">
            <h2>Current Room</h2>
            {currentRoom}
          </div>  
          <div className="chat">
            <h2>Chat</h2>
            <ul className="chat-messages">
              {chatMessages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
