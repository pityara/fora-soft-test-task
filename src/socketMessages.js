import {
  GAME_CREATED,
  JOINED_ROOM,
  ERROR,
  WINNER,
  LOOSER,
  DRAW,
} from './constants/socketActionTypes';
import { addMessage } from './actions/messageActions';
import { NEW_MESSAGE } from './constants/actionTypes';
import {
  clientJoinedRoom,
  createGame,
  meWinner,
  meLooser,
  draw
} from './actions/gameActions';
import { addError } from './actions/errorActions';

/**
 * Connect socket messages
 * to redux actions.
 * @param {socket} socket - connected to server socket
 * @param {store} store - App redux store
 */
export const socketMessages = (socket, store) => {
  const { dispatch } = store;
  socket
    // When get NEM_MESSAGE add new message with sender and text to store
    .on(NEW_MESSAGE, ({ sender, message }) => {
      dispatch(addMessage(sender, message)); })
    // When get GAME_CREATED create new game with gameId in store
    .on(GAME_CREATED, ({ gameId }) => {
      dispatch(createGame(gameId)); })
    // When get JOINED_ROOM create new game in client redux store with gameId
    .on(JOINED_ROOM, ({ gameId }) => {
      dispatch(clientJoinedRoom(gameId)); })
    // When get ERROR add error message to redux store
    .on(ERROR, ({ message }) => {
      dispatch(addError(message)); })
    // When get WINNER set winner in store
    .on(WINNER, ({ enemy_gesture }) => {
      dispatch(meWinner(enemy_gesture)); })
    // When get LOOSER set winner in store
    .on(LOOSER, ({ enemy_gesture }) => {
      dispatch(meLooser(enemy_gesture)); })
    // When get DRAW set draw in store
    .on(DRAW, () => {
      dispatch(draw()); })

};