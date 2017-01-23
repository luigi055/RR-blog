import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export const configure = (initialState = {}) => {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    initialState, 
    composeEnhancers(applyMiddleware(thunk, promise))
  );
  
  return store;
};

