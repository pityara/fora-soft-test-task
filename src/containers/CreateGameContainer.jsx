import React from 'react';
import { connect } from 'react-redux';
import { CreateGame } from '../components/CreateGame';
import {CREATE_GAME} from '../constants/socketActionTypes';
import {clearErrors} from '../actions/errorActions';

class CreateGameContainer extends React.Component {
  componentWillMount(){
    this.props.socket.emit(CREATE_GAME);
  };

  componentDidUpdate() {
    if (this.props.started) {
      this.props.history.push(this.props.gameId);
    }
    if (this.props.error) this.props.clearErrors();
  }

  render() {
    return(
      <div className="creating__container">
      {(this.props.gameId) ?
        <div className="game__created">Game created, take this link to second player:
          <input type="text" value={window.location.host+ '/' + this.props.gameId}/>
          </div>:
        <CreateGame {...this.props}/>}
      </div>
    );
  }
}

const mapStateToProps = ({ game, error }) => {
  return {
    gameId: game.id,
    started: game.started,
    error: error.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameContainer);
