// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
let ejs = require('ejs');
const mongoose = require('mongoose');
const roomsRouter = require('./routes/rooms.route');
const usersRouter = require('./routes/users.route');

mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB...'));

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));
// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/rooms', roomsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/test", (req, res) => {
  res.render("test");
})

app.get("/login", (req, res) => {
  res.render("login");
})

app.get("/register", (req, res) => {
  res.render("register");
})

app.get("/room/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
})

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
