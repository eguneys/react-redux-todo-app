import createReducer from 'lib/createReducer';

import Immutable from 'immutable';

import * as types from 'constants/ActionTypes';

const initialState = {
  todos: [{ text: 'Initial Todo', isChecked: false }]
};

export default createReducer(initialState, {
});
