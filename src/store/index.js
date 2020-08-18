import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers';
import { apiMiddleware } from './middlewares';

const withMiddleWare = applyMiddleware(apiMiddleware);

const withDevTools = process.env.isDev
  ? composeWithDevTools(withMiddleWare)
  : withMiddleWare;

// create a makeStore function
const makeStore = () => createStore(rootReducer, withDevTools);

// export an assembled wrapper
// eslint-disable-next-line import/prefer-default-export
export const wrapper = createWrapper(makeStore, { debug: true });
