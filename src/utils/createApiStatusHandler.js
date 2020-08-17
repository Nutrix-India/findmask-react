import createReducer from '@utils/createReducer';
import { apiStatus } from '@constants/index';

const getTimeStamp = () => new Date().getTime();

const initialState = {
  status: apiStatus.notUsed,
  lastResponseReceived: null
};

const createActionMap = (actionType) => ({
  [`${actionType}_REQUESTING`]: (state) => ({
    ...state,
    status: apiStatus.requesting
  }),
  [`${actionType}_SUCCESSFUL`]: (state) => ({
    ...state,
    status: apiStatus.successful,
    lastResponseReceived: getTimeStamp()
  }),
  [`${actionType}_FAILED`]: (state) => ({
    ...state,
    status: apiStatus.failed
  }),
  [`${actionType}_RESET_API_CALL`]: (state) => ({
    ...state,
    status: apiStatus.notUsed
  })
});

const createApiStatusHandler = (actionType, isUploadProgressRequired) => {
  const actionMap = createActionMap(actionType);
  if (isUploadProgressRequired) {
    actionMap[`${actionType}_UPLOAD_PROGRESS`] = (
      state,
      { uploadProgress }
    ) => ({
      ...state,
      uploadProgress
    });
  }
  return createReducer({ initialState, actionMap });
};

export default createApiStatusHandler;
