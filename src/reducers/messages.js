/**
 * Contains reducer
 * for message store
 */
import {
  CLEAR_MESSAGES,
  NEW_MESSAGE
} from '../constants/actionTypes';


/**
 * Initial state for
 * message store
 * @type {Array}
 */
const initialState = [];

/**
 * Reducer for messages store
 * @param {Array} [state=] state -  a store current state
 * @param {string} type - type of action
 * @param {payload} payload - Object with payload data
 * @returns {*}
 */
export const messages = (state=initialState, { type, payload }) => {
  switch (type) {
    // If NEW_MESSAGE action got, return state + new message object
    case NEW_MESSAGE:
      return [
        ...state,
        {
          sender: payload.sender,
          text: payload.message,
        },
      ];
      // if CLEAR_MESSAGES action got, return empty array
    case CLEAR_MESSAGES:
      return initialState;
    default:
      return state;
  }
}