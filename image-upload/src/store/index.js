import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { apiMiddleware } from './middlewares';

const withMiddleWare = applyMiddleware(
  apiMiddleware
);

const withDevTools = process.env.NODE_ENV === 'development'
  ? composeWithDevTools(withMiddleWare)
  : withMiddleWare;

const store = createStore(rootReducer, withDevTools);

export default store;