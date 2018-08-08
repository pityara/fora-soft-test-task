import {
  CLEAR_MESSAGES,
  NEW_MESSAGE
} from '../constants/actionTypes';

/**
 * Contains action creators
 * for messages store.
 */

/**
 * Action creator for NEW_MESSAGE action
 * @param {string} sender - me || enemy || game
 * @param {string} message - message text
 * @returns {{type: string, payload: {sender: *, message: *}}}
 */
export const addMessage = (sender, message) => {
  return {
    type: NEW_MESSAGE,
    payload: {
      sender,
      message,
    },
  };
};

/**
 * Action creator for CLEAR_MESSAGES action
 * @returns {{type: string}}
 */
export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};