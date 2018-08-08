/**
 * Contains
 * Gesture Picker component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { LIZARD, PAPER, ROCK, SCISSORS, SPOCK } from '../constants/gestures';
import { Gesture } from './Gesture';

/**
 * Gesture Picker component
 * @param {function} submitGesture - callback for submit my gesture
 * @param {string} myGesture - my gesture name
 * @returns {*}
 * @constructor
 */
export const GesturePicker = ({submitGesture, myGesture}) => {
  const gestures = [ LIZARD, PAPER, ROCK, SCISSORS, SPOCK ];
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

GesturePicker.propTypes = {
  submitGesture: PropTypes.func,
  myGesture: PropTypes.string,
};

GesturePicker.defaultProps = {
  submitGesture: () => {},
}