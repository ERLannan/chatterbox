import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './App.css';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment className='App'>
        {' '}
        <h1>App</h1>{' '}
      </Fragment>
    </Router>
  </Provider>
);

export default App;
