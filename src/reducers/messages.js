import {NEW_MESSAGE} from '../constants/actionTypes';

const initialState = [];

export const messages = (state=initialState, { type, payload }) => {
  switch (type) {
    case NEW_MESSAGE:
      return [
        ...state,
        {
          sender: payload.sender,
          text: payload.message,
        },
      ];
    default:
      return state;
  }
}