import React from 'react';
import { connect } from 'react-redux';
import { CreateGame } from '../components/CreateGame';
import {CREATE_GAME} from '../constants/socketActionTypes';

class CreateGameContainer extends React.Component {
  componentWillMount(){
    this.props.socket.emit(CREATE_GAME);
  };

  componentDidUpdate() {
    if (this.props.started) {
      this.props.history.push(this.props.gameId);
    }
  }

  render() {
    return(
      <div className="creating__container">
      {(this.props.gameId) ?
        <div className="game__created">Game created, your <a href={window.location.host+ '/' + this.props.gameId}>link</a></div> :
        <CreateGame {...this.props}/>}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => {
  return {
    gameId: game.id,
    started: game.started,
  };
};

export default connect(mapStateToProps)(CreateGameContainer);
