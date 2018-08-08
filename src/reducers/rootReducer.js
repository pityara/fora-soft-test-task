/**
 * Contains root reducer
 */
import { combineReducers } from 'redux';
import { game } from './game';
import { messages } from './messages';
import { error } from './error';

/**
 * Combine all reducers
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
export const rootReducer = combineReducers({
  game,
  messages,
  error,
});