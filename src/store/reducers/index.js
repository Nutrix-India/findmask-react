import { combineReducers } from 'redux';
import apiStatus from './apiStatus';
import data from './data';
import helpers from './helpers';

const mainReducer = combineReducers({
  apiStatus,
  data,
  helpers
});

export default mainReducer;
