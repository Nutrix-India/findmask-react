import axios from 'axios';

const { API_URL } = process.env;

const apiMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  // action is a thunk
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  // normal action
  if (!action?.endpoint) {
    return next(action);
  }

  const {
    endpoint,
    method = 'POST',
    data,
    type,
    uploadProgressRequired = false,
    headers = {},
    ...rest
  } = action;

  // update the store - api fetching
  next({ ...rest, type: `${type}_REQUESTING` });

  const url = `${API_URL}${endpoint}`;

  const config = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    data
  };

  if (uploadProgressRequired) {
    config.onUploadProgress = (progressEvent) => {
      next({
        type: `${type}_UPLOAD_PROGRESS`,
        uploadProgress: (progressEvent.loaded / progressEvent.total) * 100
      });
    };
  }
  // api action
  return axios(url, config)
    .then(({ data: result }) => {
      next({ ...rest, type: `${type}_SUCCESSFUL`, result });
      return next({ ...rest, type, result });
    })
    .catch((error) => {
      next({ ...rest, type: `${type}_FAILED`, error });
    });
};

export default apiMiddleware;
