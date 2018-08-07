import React from 'react';

export const Gesture  = ({ gesture_name, submitGesture, active }) => {
  const status = (active) ? "active " : (active === undefined) ? "show__only " : "disabled ";
  const className =  (gesture_name) ? "gesture " + status + gesture_name.toLowerCase() : "gesture";
  return (
    <div className={className}
         onClick={() => submitGesture(gesture_name)}> </div>
  );
}

Gesture.defaultProps = {
  submitGesture: () => {},
};