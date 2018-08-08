/**
 * Contains Chat component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ChatMessage } from './ChatMessage';

/**
 *
 * @param {Array} messages - array of messages
 * @param {function} sendMessage - callback when send message
 * @returns {*}
 * @constructor
 */
export const Chat = ({messages, sendMessage}) => {
  let _text;
  /**
   * Function callback on click submit message
   */
  const send = () => {
    sendMessage(_text.value);
    _text.value = "";
  };
  return (
    <div className="chat">
      <div className="chat__messages">
        {messages.map((message, index) =>
          <ChatMessage key={index} text={message.text} sender={message.sender}/>
        )}
      </div>
      <div className="input__container">
        <input type="text" ref={(input) => _text = input}/>
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    sender: PropTypes.string,
    messages: PropTypes.string,
  })),
  sendMessage: PropTypes.func,
};

