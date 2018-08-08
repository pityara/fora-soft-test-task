/**
 * Contains the
 * battle field
 * component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Gesture } from './Gesture';

/**
 * Battle field component
 * @param {string} myGesture
 * @param {string} enemyGesture
 * @returns {*}
 * @constructor
 */
export const Battle = ({myGesture, enemyGesture}) =>
  <div className="battle__field">
    <Gesture gesture_name={myGesture}/>
    <Gesture gesture_name={enemyGesture}/>
  </div>

Battle.propTypes = {
  myGesture: PropTypes.string,
  enemyGesture: PropTypes.string,
};