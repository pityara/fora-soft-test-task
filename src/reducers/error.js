/**
 * Contains reducer
 * for error store
 */
import { ERROR } from '../constants/socketActionTypes';
import { CLEAR_ERRORS } from '../constants/actionTypes';

/**
 * Initial state for error store
 * @type {{message: null}}
 */
const initialState = {
  message: null,
};

/**
 * Reducer for error store
 * @param {Object} [state=] state -  a store current state
 * @param {string} type - type of action
 * @param {payload} payload - Object with payload data
 * @returns {*}
 */
export const error = (state=initialState, { type, payload }) => {
  switch (type) {
    // If ERROR action received, set error message
    case ERROR:
      return {
        message: payload.message,
      };
      // If CLEAR_ERRORS action received, set store to initial state
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
};