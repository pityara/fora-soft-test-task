/**
 * Contains
 * Error container
 */
import React from 'react';
import { connect } from 'react-redux';
import { Error } from '../components/Error';
import { clearErrors } from '../actions/errorActions';
import { clearGame } from '../actions/gameActions';
import { clearMessages } from '../actions/messageActions';

class ErrorContainer extends React.Component {
  render() {
    return(
      <Error {...this.props} clearError={this.props.clearAllErrors}/>
    );
  };
}

/**
 *  map state to container props
 * @param {object} error
 * @returns {{error: *}}
 */
const mapStateToProps = ({error}) => {
  return {
    error: error.message,
  };
};

/**
 * map dispatch to container props
 * @param {function} dispatch
 * @returns {{clearAllErrors: clearAllErrors}}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    //If want clear all error, then clear all
    clearAllErrors: () => {
      dispatch(clearErrors());
      dispatch(clearGame());
      dispatch(clearMessages());
      },
  };
};

// Connect container to store
export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);
