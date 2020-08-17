import { combineReducers } from 'redux';
import apiStatus from './apiStatus';
import data from './data';

const mainReducer = combineReducers({
  apiStatus,
  data
});

export default mainReducer;
