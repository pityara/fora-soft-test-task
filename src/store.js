import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';


const createStoreWithMiddleware = applyMiddleware()(createStore);

export const configureStore = (initialState) => createStoreWithMiddleware(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);