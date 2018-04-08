import { combineReducers } from 'redux';
import keyPair from './key-pair';
import portfolio from './portfolio';

const rootReducer = combineReducers({
  keyPair,
  portfolio
});

export default rootReducer;
