import React from 'react';
import { connect } from 'react-redux';
import { Error } from '../components/Error';
import {clearErrors} from '../actions/errorActions';

class ErrorContainer extends React.Component {
  render() {
    return(
      <Error {...this.props} clearError={this.props.clearAllErrors}/>
    );
  };
};

const mapStateToProps = ({error}) => {
  return {
    error: error.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearAllErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);
