const MESSAGE = 'MESSAGE';
const NEW_MESSAGE = 'NEW_MESSAGE';
const ERROR = 'ERROR';
const CONNECT = 'CONNECT';
const PREPARE_GAME = 'PREPARE_GAME';
const CHOOSE_GESTURE = 'CHOOSE_GESTURE';
const CREATE_GAME = 'CREATE_GAME';
const GAME_CREATED = 'GAME_CREATED';
const JOINED_ROOM = 'JOINED_ROOM';
const PLAYER_JOIN_GAME = 'PLAYER_JOIN_GAME';
const WINNER = 'WINNER';
const LOOSER = 'LOOSER';
const DRAW = 'DRAW';
const SCISSORS = 'SCISSORS';
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SPOCK = 'SPOCK';
const LIZARD = 'LIZARD';

const uuid = require('uuid');
let io;
let gameSocket;
let rooms = {};

exports.initializeGame = (sio, socket) => {
  io = sio;
  gameSocket = socket;
  gameSocket.emit(MESSAGE, { message: "You're successfully connected" });
  //Events


  gameSocket.on(CREATE_GAME, createNewGame);
  gameSocket.on(CONNECT, playerConnectToRoom);
  gameSocket.on(CHOOSE_GESTURE, playerGesture);
  gameSocket.on(MESSAGE, getMessage);
  gameSocket.on('disconnect', crashRoom);
};

// When start button created

function createNewGame() {
  const gameId = uuid.v4();
  rooms[gameId]={
    gestured: false,
    isFull: false,
    players: [
      {
        id: this.id,
        gesture: null,
      }
      ],
  };
  this.gameId = gameId;
  this.join(gameId);
  this.idInRoom = 0;
  this.emit(GAME_CREATED, {gameId,});
  console.log(`new game with id ${gameId} created successfully`);
  io.sockets.in(gameId).emit(NEW_MESSAGE, {message: `Host successfully created game with ${gameId}`, sender: 'game'});
};

function playerConnectToRoom(data) {
  const gameId = data.gameId;
  if (rooms[gameId]) {
    let game = rooms[gameId];
    if(game.players[0].id === this.id) return;
    if (game.isFull) {
      this.emit(ERROR, {message: 'this room is full'});
    } else {
      game.players.push({
        id: this.id,
        gesture: null,
      });
      this.idInRoom = 1;
      this.gameId = gameId;
      this.join(gameId);
      game.isFull = true;
      //io.sockets.in(game.players[0].id).emit(PREPARE_GAME);
      console.log(`client join room with a number ${gameId}`);
      io.sockets.in(gameId).emit(NEW_MESSAGE, {message: `client successfully connected to room ${gameId}`, sender: 'game'});
      io.sockets.in(gameId).emit(JOINED_ROOM, {gameId});
    }
  } else {
    this.emit(ERROR, {message: `room with number ${gameId} does not exist`});
  }
};

function playerGesture(gesture) {
  const game = rooms[this.gameId];
  console.log(gesture);
  game.players[this.idInRoom].gesture = gesture;
  //io.sockets.in(this.roomId).emit(MESSAGE, {message: `${this.username} gesture ${gesture}`});
  if (!game.gestured) {
    game.gestured = true;
  } else {
    const result = getWinner(game.players[0].gesture, game.players[1].gesture);
    if (result === -1) {
      io.sockets.in(this.gameId).emit(DRAW);
    } else if (result === 0 || result === 1) {
      const winnerId = result;
      const looserId = (result===0) ? 1 : 0;
      io.sockets.in(game.players[winnerId].id).emit(WINNER, {enemy_gesture: game.players[looserId].gesture});
      io.sockets.in(game.players[looserId].id).emit(LOOSER, {enemy_gesture: game.players[winnerId].gesture});

    }
  }
}

function getMessage(data) {
  const game = rooms[this.gameId];
  const recipient = (game.players[0].id === this.id) ? game.players[1].id : game.players[0].id;
  io.sockets.in(recipient).emit(NEW_MESSAGE, {sender: 'enemy', message: data.message});
}

function crashRoom() {
  const game = rooms[this.gameId];
  io.sockets.in(this.gameId).emit(ERROR, {message: 'your enemy disconnected from game', sender: 'game'});
}

function getWinner(gesture1, gesture2) {
  switch (gesture1) {
    case gesture2:
      return -1;
    case SPOCK:
      return ((gesture2 === LIZARD || gesture2 === PAPER) ? 1 : 0);
    case ROCK:
      return ((gesture2 === PAPER|| gesture2 === SPOCK) ? 1 : 0);
    case PAPER:
      return ((gesture2 === SCISSORS|| gesture2 === LIZARD) ? 1 : 0);
    case SCISSORS:
      return ((gesture2 === ROCK || gesture2 === SPOCK) ? 1 : 0);
    case LIZARD:
      return ((gesture2 === SCISSORS || gesture2 === ROCK) ? 1 : 0);
    default:
      return 2;
  }
}
