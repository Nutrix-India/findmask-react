import { apiTypes, dataTypes } from '@actionTypes/index';
import createReducer from '@utils/createReducer';
import { imageInputModes } from '@constants/index';

const initialState = {
  stats: {},
  response: {},
  image: {},
  isConsentGiven: true,
  status: null,
  imageInputMode: imageInputModes.chooseFile
};

const actionMap = {
  [`${apiTypes.FETCH_STATS}_SUCCESSFUL`](state, { result }) {
    return {
      ...state,
      stats: result.stats || {}
    };
  },
  [`${apiTypes.SEND_FOR_ANALYSIS}_SUCCESSFUL`](state, { result }) {
    return {
      ...state,
      response: result || {}
    };
  },
  [dataTypes.SET_IMAGE](state, { result }) {
    return {
      ...state,
      image: result || {}
    };
  },
  [dataTypes.SET_CONSET_GIVEN](state, { result }) {
    return {
      ...state,
      isConsentGiven: result ?? true
    };
  },
  [dataTypes.RESET_DATA](state) {
    return {
      ...state,
      response: {},
      image: {},
      status: null,
      isConsentGiven: true
    };
  },
  [dataTypes.SET_IMAGE_INPUT_MODE](state, { result }) {
    return {
      ...state,
      imageInputMode: result || imageInputModes.chooseFile
    };
  }
};

const reducer = createReducer({ initialState, actionMap });

export default reducer;
