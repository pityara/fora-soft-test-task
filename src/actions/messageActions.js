import {NEW_MESSAGE} from '../constants/actionTypes';


export const addMessage = (sender, message) => {
  return {
    type: NEW_MESSAGE,
    payload: {
      sender,
      message,
    },
  };
};