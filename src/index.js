import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import socketIO from  'socket.io-client';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from './containers/AppContainer';
import { socketActions } from './actions/socketActions';
import "./index.css";

let store = configureStore();
let socket = socketIO.connect(`178.128.153.39:8484`);
socketActions(socket, store);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer socket={socket}/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
