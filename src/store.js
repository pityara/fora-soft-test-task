import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';

// Initial state for redux store
const initialState = {
  // game state
  game: {
    //id
    id: null,
    // waiting a client
    waiting: null,
    // Both players connected
    started: null,
    // Host create game
    created: null,
    // If i win game
    winner: null,
    // If there is draw
    draw: null,
    // My gesture name
    myGesture: null,
    // Enemy gesture name
    enemy_gesture: null,
  },
  // If some error in game
  error: {
    message: null,
  },
  // Chat and system messages array
  messages: [],
};

// Export function, that configure store with root reducer and initial state
export const configureStore = () => createStore(rootReducer, initialState);