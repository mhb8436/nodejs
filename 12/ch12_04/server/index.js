const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.use(express.static(path.join(__dirname, 'public')));

let users = {}; // 사용자 목록
let rooms = {}; // 채팅방 목록

io.on('connection', (socket) => {
  console.log(`user connected => 
    ${JSON.stringify(users)} : ${JSON.stringify(rooms)}`)

  // 사용자 로그인
  socket.on('login', (username) => {
    users[socket.id] = username;
    console.log(`login => ${username}`)
    socket.emit('login:success', 
      { username, rooms: Object.keys(rooms) });
    io.emit('update:users', Object.values(users));
  });

  // 채팅방 생성
  socket.on('create:room', (room) => {
    if (!rooms[room]) {
      rooms[room] = [];
      socket.join(room);
      socket.emit('room:created', room);
      io.emit('update:rooms', Object.keys(rooms));
    } else {
      socket.emit('room:exists', room);
    }
  });

  // 채팅방 참가
  socket.on('join:room', (room) => {
    if (rooms[room]) {
      socket.join(room);
      socket.emit('room:joined', room);
      socket.to(room).emit('user:joined', 
        users[socket.id]);
    } else {
      socket.emit('room:notfound', room);
    }
  });

  // 메시지 전송
  socket.on('chat:message', ({ room, message }) => {
    console.log('chat:message', room, message);
    io.to(room).emit('chat:message',  { user: users[socket.id], message });
  });

  // 사용자 연결 해제
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      io.emit('user:left', users[socket.id]);
      delete users[socket.id];
      io.emit('update:users', Object.values(users));
    }
  });
});

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
