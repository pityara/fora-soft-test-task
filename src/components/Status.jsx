import React from 'react';

export const Status = ({winner, draw}) => {
  let status;
  if(winner === true) {
    status = "Winner";
  } else if(winner === false) {
    status = "Looser";
  } else if(draw === true) {
    status = "Draw";
  }
  return (
    <div className="player__status">
      {status}
    </div>);
}