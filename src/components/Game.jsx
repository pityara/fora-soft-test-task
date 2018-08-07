import React from 'react';
import ChatContainer from '../containers/ChatContainer';
import {GameField} from './GameField';

export const Game = (props) =>
  <div className="game__container">
    <GameField {...props}/>
    <ChatContainer socket={props.socket}/>
  </div>