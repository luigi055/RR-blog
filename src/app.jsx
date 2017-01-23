import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import { addFeature } from './actions';
import { configure } from './store/store';

import 'font-awesome/scss/font-awesome.scss';
import './scss/style.scss';

console.log('React/Redux Boilerplate ready to go!');

const store = configure();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
