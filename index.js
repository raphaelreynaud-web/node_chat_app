// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle joining a room
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle room messages
  socket.on('roomMessage', (room, message) => {
    io.to(room).emit('message', message);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
