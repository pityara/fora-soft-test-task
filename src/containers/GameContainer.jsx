/**
 * Contains
 * Game Container
 */
import React from 'react';
import { connect } from 'react-redux';
import { Game } from '../components/Game';
import { CHOOSE_GESTURE, CONNECT } from '../constants/socketActionTypes';
import { getMyGesture } from '../actions/gameActions';

class GameContainer extends React.Component {
  componentWillMount(){
    //Send socket that connected to game with id from url
    this.props.socket.emit(CONNECT, {gameId: this.props.location.pathname.slice(1)});
  }

  /**
   *  Callback on submit gesture
   * @returns {Function}
   */
  submitGesture(){
    const {socket, dispatchMyGesture } = this.props;
    return (gesture) => {
      //Send socket, that choose gesture
      socket.emit(CHOOSE_GESTURE, gesture);
      // Set my gesture in store
      dispatchMyGesture(gesture);
    };
  }


  render() {
    return(
      <Game {...this.props} submitGesture={this.submitGesture()}/>
    );
  }
}

/**
 * Connect state to container props
 * @param {object} game
 * @returns {{myGesture: (null|*|string), enemyGesture: (null|string|*), winner: (null|boolean), draw: (null|boolean)}}
 */
const mapStateToProps = ({game}) => {
  return {
    myGesture: game.myGesture,
    enemyGesture: game.enemyGesture,
    winner: game.winner,
    draw: game.draw,
  }
};

/**
 * Connect actions to container props
 * @param {function} dispatch
 * @returns {{dispatchMyGesture: dispatchMyGesture}}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchMyGesture: (gesture) => {dispatch(getMyGesture(gesture));},
  }
};

/**
 * Connect container to store
 */
export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
