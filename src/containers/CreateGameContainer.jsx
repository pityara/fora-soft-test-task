/**
 * Contains
 * Create Game Container
 */
import React from 'react';
import { connect } from 'react-redux';
import { CreateGame } from '../components/CreateGame';
import { CREATE_GAME } from '../constants/socketActionTypes';


class CreateGameContainer extends React.Component {
  componentWillMount(){
    //Send socket, that want create game
    this.props.socket.emit(CREATE_GAME);
  };

  componentDidUpdate() {
    if (this.props.started) {
      //if client connected, redirect to game
      this.props.history.push(this.props.gameId);
    }
  };

  render() {
    return(
      <div className="creating__container">
      {(this.props.gameId) ?
        <div className="game__created">Game created, take this link to second player:
          <input type="text" readOnly={true} value={window.location.host+ '/' + this.props.gameId}/>
          </div>:
        <CreateGame {...this.props}/>}
      </div>
    );
  }
}

/**
 * map state to container props
 * @param {object} game
 * @param {object} error
 * @returns {{gameId: *, started: (null|boolean), error: *}}
 */
const mapStateToProps = ({ game, error }) => {
  return {
    gameId: game.id,
    started: game.started,
    error: error.message,
  };
};

/**
 * connect store to container
 */
export default connect(mapStateToProps)(CreateGameContainer);
