// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on('connection', (socket) => {
  console.log('a user connected', socket);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat:message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat:message', msg); // 모든 클라이언트에게 메시지 전송
  });
});

server.listen(3030, () => {
  console.log('listening on *:3000');
});
