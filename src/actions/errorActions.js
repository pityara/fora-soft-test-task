import {ERROR} from '../constants/socketActionTypes';

export const addError = (message) => {
  return {
    type: ERROR,
    payload: {
      message,
    },
  };
};