import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'
import TestComponent from './TestComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Page404 from './Page404/Page404';

const store = createStore(rootReducer, applyMiddleware(thunk, logger))
window.store = store

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={TestComponent} />
          <Route path='/*' component={Page404} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
