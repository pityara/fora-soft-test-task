import React from 'react';
import {LIZARD, PAPER, ROCK, SCISSORS, SPOCK} from '../constants/gestures';


export const GesturePicker = ({submitGesture}) =>
  <div className="gesture__picker">
    <div className="rock" onClick={() => submitGesture(ROCK)}>Rock</div>
    <div className="paper" onClick={()=> submitGesture(PAPER)}>Paper</div>
    <div className="scissors" onClick={()=> submitGesture(SCISSORS)}>Scissors</div>
    <div className="spock" onClick={()=> submitGesture(SPOCK)}>Spock</div>
    <div className="lizard" onClick={()=> submitGesture(LIZARD)}>Lizard</div>
  </div>