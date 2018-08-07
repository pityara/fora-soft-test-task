import React from 'react';
import {LIZARD, PAPER, ROCK, SCISSORS, SPOCK} from '../constants/gestures';
import {Gesture} from './Gesture';


export const GesturePicker = ({submitGesture, myGesture}) => {
  const gestures = [LIZARD, PAPER, ROCK, SCISSORS, SPOCK];
  const activeAll = !myGesture;
  let active;
  return(
    <div className="gesture__picker">
      {gestures.map((gesture, index) => {
          active = !(!activeAll && gesture!==myGesture);
          return (<Gesture gesture_name={gesture} submitGesture={submitGesture}
                   key={index} active={active}/>);
        }
      )}
    </div>
  );
};