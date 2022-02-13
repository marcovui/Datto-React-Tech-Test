import { combineReducers } from 'redux';
import { reducer as characters } from './characters';

const reducers = {
  characters,
  // other reducers go here
};

export const appReducer = combineReducers(reducers);
