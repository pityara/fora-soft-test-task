import React from 'react';
import {Status} from './Status';
import {GesturePicker} from './GesturePicker';
import {Battle} from './Battle';


export const GameField = ({ myGesture, enemyGesture, submitGesture, draw, winner }) => {
  const gestureClickAction = (myGesture) ? () => {} : submitGesture;
  return (
    <div className="game__field">
      <Status winner={winner} draw={draw}/>
      <Battle myGesture={myGesture} enemyGesture={enemyGesture}/>
      <GesturePicker submitGesture={gestureClickAction} myGesture={myGesture}/>
    </div>)
}