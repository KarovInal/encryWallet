import { combineReducers } from 'redux';
import keyPair from './key-pair';
import portfolio from './portfolio';
import history from './history';

const rootReducer = combineReducers({
  keyPair,
  portfolio,
  history
});

export default rootReducer;
