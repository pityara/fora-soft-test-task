/**
 * Contains
 * Error component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Error component
 * @param {string} error - error message text
 * @param {function} clearError - callback for clearError
 * @returns {*}
 * @constructor
 */
export const Error = ({error, clearError}) =>
  <div className="error">
    {error}, if you want create new game click
    <Link to="/" onClick={() => clearError()}> here</Link>
  </div>;

Error.propTypes = {
  error: PropTypes.string,
  clearError: PropTypes.func,
};

Error.defaultProps = {
  error: "Unknown Error",
  clearError: () => {},
};