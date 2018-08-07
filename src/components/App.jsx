import React, { Component } from 'react';
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

export default App;
