
///******Importing various packages for app functionality */
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const { formatMessage, formatHistoryMessage } = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')

///******Importing routes for app functionality */
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');


const app = express();
const server = http.createServer(app);
require('dotenv').config();
PORT = process.env.PORT;

app.use(bodyParser.json()); // FOR PARSING INCOMING DATA.
app.use(express.static(path.join(__dirname, 'public'))); // SETTING STATIC PATH TO FOLDER PUBLIC.

///******CORS ********////
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes); //Feed routes for chats
app.use('/auth', authRoutes); //Auth routes for Login

///****** DB CONNECTION ********////
const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  logging: false
});
sequelize
  .authenticate()
  .then(function (err) {
    server.listen(PORT)

    const io = require('./socket').init(server);

    // Functionality on connecting user.
    io.on('connection', (socket) => {
      socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        socket.emit('historyFetch');
        socket.broadcast.to(user.room).emit('message', formatMessage(process.env.BOTNAME, `${user.username} has joined the chat!!`))
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });

      })

      // Formatting old messages from database before emitting.
      socket.on('oldMessage', (element) => {
        io.to(socket.id).emit('message', formatHistoryMessage(element))
      });

      // Formatting real time chat messages .
      socket.on('chatMessage', ({ msg }) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg))
      });

      // Functionality on disconnecting user.
      socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
          io.to(user.room).emit(
            'message',
            formatMessage(process.env.BOTNAME, `${user.username} has left the chat`)
          );

          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
        }
      });
    });
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
