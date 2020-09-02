import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'
import TestComponent from './TestComponent';

const store = createStore(rootReducer, applyMiddleware(thunk, logger))
window.store = store

function App() {
  return (
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
}

export default App;
