import { ERROR } from '../constants/socketActionTypes';
import { CLEAR_ERRORS } from '../constants/actionTypes';

/**
 * Contains action creators
 * for error store.
 */

/**
 * Action creator for ERROR action
 * @param {string} message - error message string
 * @returns {{type: string, payload: {message: *}}}
 */
export const addError = (message) => {
  return {
    type: ERROR,
    payload: {
      message,
    },
  };
};

/**
 * Action creator for CLEAR_ERRORS action
 * @returns {{type: string}}
 */
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};