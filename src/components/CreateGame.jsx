/**
 * Contains
 * CrateGame component
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * CreateGame component
 * @param {string} gameId - game uniq identifier
 * @returns {*}
 * @constructor
 */
export const CreateGame = ({ gameId }) =>
    <div className="create__new__game">
      GameCreating...
      {gameId}
    </div>;

CreateGame.propTypes = {
  gameId: PropTypes.string,
};
