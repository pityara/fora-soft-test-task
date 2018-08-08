/**
 * Contains
 * Chat container
 */
import React from 'react';
import { connect } from 'react-redux';
import { Chat } from '../components/Chat';
import { addMessage } from '../actions/messageActions';
import { MESSAGE } from '../constants/socketActionTypes';


class ChatContainer extends React.Component {
  /**
   * function for send message
   * @returns {Function}
   */
  sendMessage() {
    const { socket, addMessage } = this.props;
    return (message) => {
      //Send message to socket
      socket.emit(MESSAGE, {message});
      //Add message to store
      addMessage(message);
    };
  };

  render() {
    return(
      <Chat {...this.props} sendMessage={this.sendMessage()}/>
    )
  }

}

/**
 * connect store to component props
 * @param {array} messages
 * @returns {{messages: *}}
 */
const mapStateToProps = ({ messages }) => {
  return {
    messages,
  };
};

/**
 * connect actions to component props
 * @param {function} dispatch
 * @returns {{addMessage: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    // Set sender as 'me'
    /**
     *
     * @param {string} message
     * @returns {*}
     */
    addMessage: (message) => dispatch(addMessage('me', message)),
  };
};

/**
 * connect store to container
 */
export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);