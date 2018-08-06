import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import socketIO from  'socket.io-client';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from './containers/AppContainer';
import { socketActions } from './actions/socketActions';

let store = configureStore();
let socket = socketIO.connect(`${window.location.hostname}:8484`);
socketActions(socket, store);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer socket={socket}/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
