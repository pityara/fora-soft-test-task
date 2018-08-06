import {ERROR} from '../constants/socketActionTypes';

const initialState = {};

export const error = (state=initialState, { type, payload }) => {
  switch (type) {
    case ERROR:
      return {
        message: payload.message,
      };
    default:
      return state;
  }
};