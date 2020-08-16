import { combineReducers } from 'redux';
import { apiTypes } from '../actionTypes';
import createApiStatusHandler from '../../utils/createApiStatusHandler';

const apiStatus = combineReducers({
  [apiTypes.FETCH_STATS]: createApiStatusHandler(apiTypes.FETCH_STATS),
  [apiTypes.SEND_FOR_ANALYSIS]: createApiStatusHandler(apiTypes.SEND_FOR_ANALYSIS, true),
  [apiTypes.SEND_FEEDBACK]: createApiStatusHandler(apiTypes.SEND_FEEDBACK)
});

export default apiStatus;