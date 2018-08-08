/**
 * Contains
 * App container
 */
import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';

/**
 * Application container
 * @param {object} props - this.props
 * @returns {*}
 * @constructor
 */
const AppContainer = (props) =>
  <App {...props} />;

/**
 * connect state to component props
 * @param {object} error - object with error
 * @returns {{error: *}}
 */
const mapStateToProps = ({ error }) => {
  return {
    error,
  };
};

/**
 * connect store to container
 */
export default connect(mapStateToProps)(AppContainer);

