import {
  CLEAR_GAME,
  GET_MY_GESTURE,
} from '../constants/actionTypes';
import {
  DRAW,
  GAME_CREATED,
  JOINED_ROOM,
  LOOSER,
  WINNER,
} from '../constants/socketActionTypes';

/**
 * Contains action creators
 * for game store
 */

/**
 * Action creator for GAME_CREATED action
 * @param {string} gameId - game uniq id
 * @returns {{type: string, payload: {gameId: *}}}
 */
export const createGame = (gameId) => {
  return {
    type: GAME_CREATED,
    payload: {
      gameId,
    },
  };
};

/**
 * Action creator for JOINED_ROOM action
 * @param {string} gameId - game uniq id
 * @returns {{type: string, payload: {gameId: *}}}
 */
export const clientJoinedRoom = (gameId) => {
  return {
    type: JOINED_ROOM,
    payload: {
      gameId,
    },
  };
};

/**
 * Action creator for GET_MY_GESTURE action
 * @param {string} gesture - Gesture name string
 * @returns {{type: string, payload: {gesture: *}}}
 */
export const getMyGesture = (gesture) => {
  return {
    type: GET_MY_GESTURE,
    payload: {
      gesture,
    },
  };
};

/**
 * Action creator for WINNER action
 * @param {string} enemy_gesture - Enemy gesture name string
 * @returns {{type: string, payload: {enemy_gesture: *}}}
 */
export const meWinner = (enemy_gesture) => {
  return {
    type: WINNER,
    payload: {
      enemy_gesture,
    },
  };
};

/**
 * Action creator for LOOSER action
 * @param {string} enemy_gesture - Enemy gesture name string
 * @returns {{type: string, payload: {enemy_gesture: *}}}
 */
export const meLooser = (enemy_gesture) => {
  return {
    type: LOOSER,
    payload: {
      enemy_gesture,
    },
  };
};

/**
 * Action creator for DRAW action
 * @returns {{type: string}}
 */
export const draw = () => {
  return {
    type: DRAW,
  };
};

/**
 * Action creator for CLEAR_GAME
 * @returns {{type: string}}
 */
export const clearGame = () => {
  return {
    type: CLEAR_GAME,
  };
};


