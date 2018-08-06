import React from 'react';
import {ChatMessage} from './ChatMessage';


export const Chat = ({messages, sendMessage}) => {
  let _text;
  const send = () => {
    sendMessage(_text.value);
    _text.value = "";
  }
  return (
    <div className="chat">
      {messages.map((message, index) =>
        <ChatMessage key={index} text={message.text} sender={message.sender}/>
      )}
      <input type="text" ref={(input) => _text = input}/>
      <button onClick={send}>Send</button>
    </div>
  );
};
