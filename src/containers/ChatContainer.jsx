import React from 'react';
import { connect } from 'react-redux';
import { Chat } from '../components/Chat';
import {addMessage} from '../actions/messageActions';
import {MESSAGE} from '../constants/socketActionTypes';


class ChatContainer extends React.Component {
  sendMessage() {
    const { socket, addMessage } = this.props;
    return (message) => {
      socket.emit(MESSAGE, {message});
      addMessage(message);
    };
  };

  render() {
    return(
      <Chat {...this.props} sendMessage={this.sendMessage()}/>
    )
  }

}

const mapStateToProps = ({ messages }) => {
  return {
    messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => dispatch(addMessage('me', message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);