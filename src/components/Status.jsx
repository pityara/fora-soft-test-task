/**
 * Contains
 * game status component
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Status Component
 * @param {boolean} winner - winner flag
 * @param {boolean} draw - draw flag
 * @returns {*}
 * @constructor
 */
export const Status = ({winner, draw}) => {
  let status;
  if(winner === true) {
    status = "Winner!!!";
  } else if(winner === false) {
    status = "Looser :(";
  } else if(draw === true) {
    status = "Draw!!!";
  }
  return (
    <div className="player__status">
      {status || "Choose your gesture"}
    </div>);
};

Status.propTypes = {
  winner: PropTypes.bool,
  draw: PropTypes.bool,
};