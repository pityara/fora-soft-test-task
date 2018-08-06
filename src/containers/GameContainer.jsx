import React from 'react';
import { connect } from 'react-redux';
import { Game } from '../components/Game';
import {CHOOSE_GESTURE, CONNECT} from '../constants/socketActionTypes';
import {getMyGesture} from '../actions/gameActions';

class GameContainer extends React.Component {
  componentWillMount(){
    this.props.socket.emit(CONNECT, {gameId: this.props.location.pathname.slice(1)});
  }

  status = null;

  componentWillUpdate() {
  }

  submitGesture(){
    const {socket, dispatchMyGesture } = this.props;
    return (gesture) => {
      socket.emit(CHOOSE_GESTURE, gesture);
      dispatchMyGesture(gesture);
    };
  }


  render() {
    return(
      <Game {...this.props} submitGesture={this.submitGesture()}/>
    );
  }
}

const mapStateToProps = ({game}) => {
  return {
    myGesture: game.myGesture,
    winner: game.winner,
    draw: game.draw,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchMyGesture: (gesture) => {dispatch(getMyGesture(gesture));},
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
