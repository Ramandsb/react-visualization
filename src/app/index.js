import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'
import TestComponent from './Components/TestComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Page404 from './Components/Page404/Page404';
import DefaultLayout from './Components/DefaultLayout';

const store = createStore(rootReducer, applyMiddleware(thunk, logger))
window.store = store

function App() {
  return (
    <Provider store={store}>
      <Router>
        <DefaultLayout />
      </Router>
    </Provider>
  );
}

export default App;
