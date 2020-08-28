import { apiTypes, dataTypes, helperTypes } from '@actionTypes/index';

export const fetchStats = () => (dispatch) =>
  dispatch({
    type: apiTypes.FETCH_STATS,
    endpoint: 'api/get_stats/',
    method: 'get'
  });

export const sendForAnalysis = (data) => (dispatch) =>
  dispatch({
    type: apiTypes.SEND_FOR_ANALYSIS,
    endpoint: 'api/predict/',
    uploadProgressRequired: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });

export const sendFeedback = (data) => (dispatch) =>
  dispatch({
    type: apiTypes.SEND_FEEDBACK,
    endpoint: 'api/feedback/',
    data
  });

export const setImage = (image) => ({
  type: dataTypes.SET_IMAGE,
  result: image
});

export const setConsentGiven = (isConsentGiven) => ({
  type: dataTypes.SET_CONSET_GIVEN,
  result: isConsentGiven
});

export const resetData = () => ({
  type: dataTypes.RESET_DATA
});

export const setImageInputMode = (mode) => ({
  type: dataTypes.SET_IMAGE_INPUT_MODE,
  result: mode
});

export const setShowOrientationMsg = (showOrientationMsg) => ({
  type: helperTypes.SET_SHOW_ORIENTATION_MSG,
  showOrientationMsg
});

export const updateFaceClassesCounts = (countsObj) => ({
  type: dataTypes.UPDATE_FACE_CLASSES_COUNTS,
  result: countsObj
});
