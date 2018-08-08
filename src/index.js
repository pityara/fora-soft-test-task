import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import socketIO from  'socket.io-client';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from './containers/AppContainer';
import { socketMessages } from './socketMessages';
import "./index.css";

/**
 * Contains client app entry point
 */

/**
 * Socket server address and port, change on production server
 * @type {string}
 */
const SOCKET_HOST = 'localhost:8484';
// create redux store
let store = configureStore();
//connect to socket.io server
let socket = socketIO.connect(SOCKET_HOST);
//connect store to socket messages
socketMessages(socket, store);

/**
 * Render root element with connected redux store
 * And pass socket to AppContainer
  */
ReactDOM.render(
  <Provider store={store}>
    <AppContainer socket={socket}/>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

