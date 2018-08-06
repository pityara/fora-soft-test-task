import React from 'react';
import ChatContainer from '../containers/ChatContainer';
import {GesturePicker} from './GesturePicker';
import {Status} from './Status';

export const Game = ({ socket, myGesture, submitGesture, draw, winner }) =>
  <div className="game__container">
    <Status winner={winner} draw={draw}/>
    {(!myGesture) ?
      <GesturePicker submitGesture={submitGesture}/> :
      ""}
    <ChatContainer socket={socket}/>
  </div>