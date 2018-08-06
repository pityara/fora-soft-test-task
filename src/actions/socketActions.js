import {
  GAME_CREATED,
  JOINED_ROOM,
  ERROR,
  WINNER,
  LOOSER,
  DRAW,
  PREPARE_GAME
} from '../constants/socketActionTypes';
import { addMessage } from './messageActions';
import { NEW_MESSAGE } from '../constants/actionTypes';
import { clientJoinedRoom, createGame, prepareGame, meWinner, meLooser, draw } from './gameActions';
import { addError } from './errorActions';


export const socketActions = (socket, store) => {
  const { dispatch } = store;
  socket
    .on(NEW_MESSAGE, ({ sender, message }) => { dispatch(addMessage(sender, message)); })
    .on(GAME_CREATED, ({ gameId }) => {dispatch(createGame(gameId)); })
    .on(JOINED_ROOM, ({ gameId }) => {dispatch(clientJoinedRoom(gameId)); })
    .on(PREPARE_GAME, () => { dispatch(prepareGame()); })
    .on(ERROR, ({ message }) => { dispatch(addError(message)); })
    .on(WINNER, ({ enemy_gesture }) => { dispatch(meWinner(enemy_gesture)); })
    .on(LOOSER, ({ enemy_gesture }) => { dispatch(meLooser(enemy_gesture)); })
    .on(DRAW, () => { dispatch(draw()); })

};