import React from 'react';

export const ChatMessage = ({text, sender}) =>
  <div className={"chat__message " + sender}>{sender} : {text}</div>