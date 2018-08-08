const express = require('express');
const app = express();

//connect module with game functions
const game= require('./gameController.js');

//say server that he must listening port 8484
const server = app.listen(8484);

//attach socket.io server to express server
const io = require('socket.io').listen(server);

//run initialization on every connect
io.sockets.on('connection', (socket) => {
  //Log connected client id
  console.log(`Client with id ${socket.id} connected`);
  //Call method that bind all game functions on actions
  game.initializeGame(io, socket);
});


