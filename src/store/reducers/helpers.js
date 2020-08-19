import { helperTypes } from '@actionTypes/index';
import createReducer from '@utils/createReducer';

const initialState = {
  showOrientationMsg: false
};

const actionMap = {
  [helperTypes.SET_SHOW_ORIENTATION_MSG](state, { showOrientationMsg }) {
    return {
      ...state,
      showOrientationMsg
    };
  }
};

const reducer = createReducer({ initialState, actionMap });

export default reducer;
