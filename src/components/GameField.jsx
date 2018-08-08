/**
 * Contains
 * Game Field Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Status } from './Status';
import { GesturePicker } from './GesturePicker';
import { Battle } from './Battle';

/**
 * Game Field component
 * @param {string} myGesture - my gesture name
 * @param {string} enemyGesture - enemy gesture name
 * @param {function} submitGesture - callback submit my gesture function
 * @param {boolean} draw - draw flag
 * @param {boolean} winner - winner flag
 * @returns {*}
 * @constructor
 */
export const GameField = ({ myGesture, enemyGesture, submitGesture, draw, winner }) => {
  const gestureClickAction = (myGesture) ? () => {} : submitGesture;
  return (
    <div className="game__field">
      <Status winner={winner} draw={draw}/>
      <Battle myGesture={myGesture} enemyGesture={enemyGesture}/>
      <GesturePicker submitGesture={gestureClickAction} myGesture={myGesture}/>
    </div>)
};

GameField.propTypes = {
  myGesture: PropTypes.string,
  enemyGesture: PropTypes.string,
  submitGesture: PropTypes.func,
  draw: PropTypes.bool,
  winner: PropTypes.bool,
};

GameField.defaultProps = {
  submitGesture: () => {},
};
