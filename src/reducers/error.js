import {ERROR} from '../constants/socketActionTypes';
import {CLEAR_ERRORS} from '../constants/actionTypes';

const initialState = {};

export const error = (state=initialState, { type, payload }) => {
  switch (type) {
    case ERROR:
      return {
        message: payload.message,
      };
    case CLEAR_ERRORS:
      return {

      };
    default:
      return state;
  }
};