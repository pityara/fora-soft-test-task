/**
 * Contains
 * Game component
 */
import React from 'react';
import PropTypes from 'prop-types';
import ChatContainer from '../containers/ChatContainer';
import { GameField } from './GameField';

/**
 * Game component
 * @param {Object} props - this.props
 * @returns {*}
 * @constructor
 */
export const Game = (props) =>
  <div className="game__container">
    <GameField {...props}/>
    <ChatContainer socket={props.socket}/>
  </div>;

Game.propTypes = {
  socket: PropTypes.object,
  submitGesture: PropTypes.func,
  myGesture: PropTypes.string,
  winner: PropTypes.bool,
  draw: PropTypes.bool,
  enemyGesture: PropTypes.string,
  dispatchMyGesture: PropTypes.func,
};

Game.defaultProps = {
  submitGesture: () => {},
  dispatchMyGesture: () => {},
};