import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import { createLogger } from 'redux-logger';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import App from './App';
import rootReducer from './client/redux/reducers/rootReducer';

const logger = createLogger();

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk, logger)
);

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('fiveThreeOneApp', () => Index);
