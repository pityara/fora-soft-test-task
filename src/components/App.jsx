/**
 * Contains App component
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateGameContainer from '../containers/CreateGameContainer';
import GameContainer from '../containers/GameContainer';
import ErrorContainer from '../containers/ErrorContainer';


class App extends Component {
  render() {
    const { socket, error } = this.props;
    return (
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          {(!error.message) ?
            <Switch>
              <Route path={'/:gameId'} render={(props)=> <GameContainer socket={socket} {...props}/> } />
              <Route path={'/'} render={(props)=> <CreateGameContainer socket={socket} {...props} />} /> :
            </Switch> :
            <ErrorContainer history={this.props.history}/>}
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  socket: PropTypes.object.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default App;
