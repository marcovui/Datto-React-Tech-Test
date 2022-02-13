import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from 'store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
