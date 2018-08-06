import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateGameContainer from '../containers/CreateGameContainer';
import GameContainer from '../containers/GameContainer';
import '../App.css';


class App extends Component {
  render() {
    const { socket, error } = this.props;
    return (
      <div className="App">
        {(!error.message) ?
          <BrowserRouter>
            <Switch>
              <Route path={'/:gameId'} render={(props)=> <GameContainer socket={socket} {...props}/> } />
              <Route path={'/'} render={(props)=> <CreateGameContainer socket={socket} {...props} />} /> :
            </Switch>
          </BrowserRouter> :
          <div className="error">
            {error.message}
          </div>}
      </div>
    );
  }
}

export default App;
