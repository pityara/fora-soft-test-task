import {
  GET_MY_GESTURE
} from '../constants/actionTypes';
import {
  DRAW,
  GAME_CREATED,
  JOINED_ROOM, LOOSER, PREPARE_GAME, WINNER,
} from '../constants/socketActionTypes';


export const createGame = (gameId) => {
  return {
    type: GAME_CREATED,
    payload: {
      gameId,
    },
  };
};

export const clientJoinedRoom = (gameId) => {
  return {
    type: JOINED_ROOM,
    payload: {
      gameId,
    },
  };
};

export const prepareGame = () => {
  return {
    type: PREPARE_GAME,
  }
};

export const getMyGesture = (gesture) => {
  return {
    type: GET_MY_GESTURE,
    payload: {
      gesture,
    }
  }
}

export const meWinner = (enemy_gesture) => {
  return {
    type: WINNER,
    payload: {
      enemy_gesture,
    },
  };
};

export const meLooser = (enemy_gesture) => {
  return {
    type: LOOSER,
    payload: {
      enemy_gesture,
    },
  };
};

export const draw = () => {
  return {
    type: DRAW,
  };
};


