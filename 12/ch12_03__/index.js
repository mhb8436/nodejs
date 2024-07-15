const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log(`client connected ${socket}`);
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    socket.on('message', (message) => {
        console.log(`msg : ${message}`);
        io.emit('message', message);
    })
});

http.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});