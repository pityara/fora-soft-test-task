import {ERROR} from '../constants/socketActionTypes';
import {CLEAR_ERRORS} from '../constants/actionTypes';

export const addError = (message) => {
  return {
    type: ERROR,
    payload: {
      message,
    },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};