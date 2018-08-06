import { combineReducers } from 'redux';
import { game } from './game';
import { messages } from './messages';
import { error } from './error';


export const rootReducer = combineReducers({
  game,
  messages,
  error,
});