var express = require('express');
var path = require('path');
var app = express();
//connect module with game functions
var rpssl = require('./rpsslGame.js');

//configure application
//app.use(express.logger('dev'));
//Setting up where serve static files
app.use(express.static(path.join(__dirname, 'public')));
var server = app.listen(8484)

//attach socket.io server to express server
var io = require('socket.io').listen(server);

//Reduce the logging output of Socket.io
//io.set('log level', 1);

//run initialization on every connect
io.sockets.on('connection', (socket) => {
  console.log('client connected', socket.id);
  rpssl.initializeGame(io, socket);
})


