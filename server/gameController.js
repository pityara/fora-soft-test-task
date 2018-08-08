/**
 * Contains base game logic functions
 */

/**
 * Constants for socket messages
 * @type {string}
 */
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

/**
 *uuid for creating uniq room id
 * @type {v4|*}
 */
const uuid = require('uuid');
//sockets
let io;
let gameSocket;
/**
 * object that holds game rooms states
 * @type {{}}
 */
let rooms = {};

/**
 * Initialize the game and bind functions to the sockets messages
 * @param {socket} sio - external socket
 * @param {socket} socket - game socket
 */

exports.initializeGame = (sio, socket) => {
  io = sio;
  gameSocket = socket;
  //send to connected client message that he connects successfully
  gameSocket.emit(MESSAGE, { message: "You're successfully connected" });
  /**
   * Binding game functions
   * to socket messages
   */
  //When client connect to the root
  gameSocket.on(CREATE_GAME, createNewGame);
  //When client connect to the concrete room
  gameSocket.on(CONNECT, playerConnectToRoom);
  //When client choose him gesture
  gameSocket.on(CHOOSE_GESTURE, playerGesture);
  //When client send message
  gameSocket.on(MESSAGE, getMessage);
  //When client disconnect
  gameSocket.on('disconnect', crashRoom);
};

/**
 * Creating new game room,
 * calls when client send message
 * "CREATE_GAME"
 */
function createNewGame() {
  //Generating game uniq id
  const gameId = uuid.v4();
  //Creating room in rooms "object" with started property
  rooms[gameId]={
    //All players a gestured
    gestured: false,
    //Room game is full
    isFull: false,
    //Array with players
    players: [
      {
        id: this.id,
        gesture: null,
      }
      ],
  };
  //Add "gameId" attribute to the client socket object
  this.gameId = gameId;
  //Join created room
  this.join(gameId);
  //Add "ifInRoom" attribute to the client socket object
  this.idInRoom = 0;
  //Send client "GAME_CREATED" message
  this.emit(GAME_CREATED, {gameId,});
  //Log that game is created
  console.log(`new game with id ${gameId} created successfully`);
  //Send message to this room
  io.sockets.in(gameId).emit(NEW_MESSAGE, {
    message: `Host successfully created game with ${gameId}`,
    sender: 'game'});
};

/**
 * Connecting client
 * to the game room,
 * calls when client send message "CONNECT"
 * @param {{ gameId: string }} data - object with data from client
 */
function playerConnectToRoom(data) {
  const gameId = data.gameId;
  // If room exists
  if (rooms[gameId]) {
    let game = rooms[gameId];
    // If host connect to room return from function
    if(game.players[0].id === this.id) return;
    // If already 2 players in room
    if (game.isFull) {
      // Send error to client
      this.emit(ERROR, {message: 'this room is full'});
    } else {
      // If not push to players array player data
      game.players.push({
        // id of socket
        id: this.id,
        // default gesture
        gesture: null,
      });
      // Add "idInRoom" and "gameId" attributes to socket object"
      this.idInRoom = 1;
      this.gameId = gameId;
      // Join the game room
      this.join(gameId);
      // Say6 that this room is now full
      game.isFull = true;
      console.log(`client join room with a number ${gameId}`);
      //Send messages to the room
      io.sockets.in(gameId).emit(NEW_MESSAGE, {
        message: `client successfully connected to room ${gameId}`,
        sender: 'game'});
      io.sockets.in(gameId).emit(JOINED_ROOM, {gameId});
    }
    //Else if this room doesn't exists send error to client
  } else {
    this.emit(ERROR, {message: `room with number ${gameId} does not exist`});
  }
}

/**
 * Changing player gesture on server,
 * and choose winner if that
 * necessary.
 * Calls, when client choose gesture.
 * @param {string} gesture - gesture, that player choose
 */

function playerGesture(gesture) {
  const game = rooms[this.gameId];
  // Set gesture value in server
  game.players[this.idInRoom].gesture = gesture;
  // If no one  choose gesture yet, set gestured attribute to true
  if (!game.gestured) {
    game.gestured = true;
    // If gesture attribute already set to true, choose winner
  } else {
    const result = getWinner(game.players[0].gesture, game.players[1].gesture);
    //If draw result, send DRAW message to server
    if (result === -1) {
      io.sockets.in(this.gameId).emit(DRAW);
      //If correct(0 id or 1 id player win) result
    } else if (result === 0 || result === 1) {
      //calculate winner and looser id
      const winnerId = result;
      const looserId = (result===0) ? 1 : 0;
      // Send winner "WINNER" message with gesture of enemy
      io.sockets.in(game.players[winnerId].id).emit(WINNER, {
        enemy_gesture: game.players[looserId].gesture});
      // Send looser "LOOSER" message with gesture of enemy
      io.sockets.in(game.players[looserId].id).emit(LOOSER, {
        enemy_gesture: game.players[winnerId].gesture});
    }
  }
}

/**
 * Sending message, from one player<
 * to another, just receive 1 message,
 * calculate recipient and send this message to him.
 * @param {{message: string}} data - object, that contains the message
 */
function getMessage(data) {
  const game = rooms[this.gameId];
  // Calculate recipient
  const recipient = (game.players[0].id === this.id) ? game.players[1].id : game.players[0].id;
  // Send message to recipient with 'enemy sender field
  io.sockets.in(recipient).emit(NEW_MESSAGE, {sender: 'enemy', message: data.message});
}

/**
 * Destroy room, when
 * one player is disconnect from game.
 */
function crashRoom() {
  // Send ERROR to this room
  io.sockets.in(this.gameId).emit(ERROR, {message: 'your enemy disconnected from game'});
  delete rooms[this.gameId];
}

/**
 * Calculate the winner
 * of gesture pair,
 * and return number of winner gesture
 * 0 - if gesture1 win
 * 1 - if gesture2 win
 * -1 - if draw
 * 2 - if incorrect values passed to function
 * @param {string} gesture1 - contains gesture1 name
 * @param {string} gesture2 - contains gesture2 name
 * @returns {number}
 */
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
