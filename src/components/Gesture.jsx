/**
 * Contains
 * Gesture component
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Gesture component
 * @param {string} gesture_name - gesture name string
 * @param {function} submitGesture - submit my gesture callback
 * @param {boolean} active - ready to click flag
 * @returns {*}
 * @constructor
 */
export const Gesture  = ({ gesture_name, submitGesture, active }) => {
  const status = (active) ? "active " : (active === undefined) ? "show__only " : "disabled ";
  const className =  (gesture_name) ? "gesture " + status + gesture_name.toLowerCase() : "gesture";
  return (
    <div className={className}
         onClick={() => submitGesture(gesture_name)}> </div>
  );
};

Gesture.propTypes = {
  gesture_name: PropTypes.string,
  submitGesture: PropTypes.func,
  active: PropTypes.bool,
};

Gesture.defaultProps = {
  submitGesture: () => {},
};