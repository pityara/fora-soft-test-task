/**
 * Contains reducer
 * for game store.
 */
import {
  CLEAR_GAME,
  GET_MY_GESTURE
} from '../constants/actionTypes';
import {
  DRAW,
  GAME_CREATED,
  JOINED_ROOM,
  LOOSER,
  WINNER,
} from '../constants/socketActionTypes';

/**
 * A initial state of game store
 * @type {{id: null, created: boolean, waiting: boolean, started: boolean, myGesture: null, enemyGesture: null, winner: null, draw: null}}
 */
const initialState = {
  id: null,
  created: false,
  waiting: false,
  started: false,
  myGesture: null,
  enemyGesture: null,
  winner: null,
  draw: null,
};
/**
 * Reducer for game store
 * @param {Object} [state=] state -  a store current state
 * @param {string} type - type of action
 * @param {payload} payload - Object with payload data
 * @returns {*}
 */
export const game = (state=initialState, { type, payload } ) => {
  switch (type) {
    // If GAME_CREATED action received, initialize new game with gamId
    case GAME_CREATED:
      return {
        ...state,
        id: payload.gameId,
        created: true,
        waiting: true,
      };
      // If JOINED_ROOM action received, initialize and start game with gameId
    case JOINED_ROOM:
      return {
        ...state,
        id: payload.gameId,
        waiting: false,
        created: true,
        started: true,
      };
      // If GET_MY_GESTURE action received, set myGesture
    case GET_MY_GESTURE:
      return {
        ...state,
        myGesture: payload.gesture,
      };
      // If WINNER action received, set winner to true and enemy_gesture
    case WINNER:
      return {
        ...state,
        winner: true,
        enemyGesture: payload.enemy_gesture,
      };
      // If LOOSER action received, set winner to false, and enemy_gesture
    case LOOSER:
      return {
        ...state,
        winner: false,
        enemyGesture: payload.enemy_gesture,
      };
      // If DRAW action receive, set draw to true, and enemy_gesture
    case DRAW:
      return {
        ...state,
        draw: true,
        enemyGesture: state.myGesture,
      };
      // If CLEAR_GAME action received, set store to initial state
    case CLEAR_GAME:
      return {
        initialState,
      };
    default:
      return state;
  }
};