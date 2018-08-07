import React from 'react';
import {Gesture} from './Gesture';

export const Battle = ({myGesture, enemyGesture}) =>
  <div className="battle__field">
    <Gesture gesture_name={myGesture}/>
    <Gesture gesture_name={enemyGesture}/>
  </div>