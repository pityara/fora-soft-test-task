import React from 'react';
import { Link } from 'react-router-dom';


export const Error = ({error, clearError}) =>
  <div className="error">{error}, if you want create new game click <Link to="/" onClick={() => clearError()}>here</Link></div>