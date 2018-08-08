/**
 * Contains
 * chat message component
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * ChatMessage component
 * @param {string} text - text of message
 * @param {string} sender - author of message
 * @returns {*}
 * @constructor
 */
export const ChatMessage = ({text, sender}) =>
  <div className={"chat__message " + sender}>{sender} : {text}</div>;

ChatMessage.propTypes = {
  text: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
};

ChatMessage.defaultProps = {
  sender: "anon",
  text: "...empty message...",
};