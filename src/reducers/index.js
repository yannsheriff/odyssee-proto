import { combineReducers } from 'redux';
import counter from './counter';
import nav from './nav';
import sailing from './sailing';

export default combineReducers({
  sailing,
  counter,
  nav,
});
