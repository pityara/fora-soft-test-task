import { GET_MY_GESTURE} from '../constants/actionTypes';
import {
  DRAW,
  GAME_CREATED,
  JOINED_ROOM, LOOSER,
  PREPARE_GAME, WINNER,
} from '../constants/socketActionTypes';

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

export const game = (state=initialState, { type, payload } ) => {
  switch (type) {
    case GAME_CREATED:
      return {
        ...state,
        id: payload.gameId,
        created: true,
        waiting: true,
      };
    case JOINED_ROOM:
      return {
        ...state,
        id: payload.gameId,
        waiting: false,
        created: true,
        started: true,
      };
    case PREPARE_GAME:
      return {
        ...state,
        started: true,
      };
    case GET_MY_GESTURE:
      return {
        ...state,
        myGesture: payload.gesture,
      };
    case WINNER:
      return {
        ...state,
        winner: true,
        enemyGesture: payload.enemy_gesture,
      };
    case LOOSER:
      return {
        ...state,
        winner: false,
        enemyGesture: payload.enemy_gesture,
      };
    case DRAW:
      return {
        ...state,
        draw: true,
        enemyGesture: state.myGesture,
      };
    default:
      return state;

  }
};