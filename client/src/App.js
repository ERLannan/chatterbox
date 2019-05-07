import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './App.css';
import store from './store';
import PrivateRoute from './common/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//Compoents
import NavBar from './components/layout/NavBar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

//Container
import Chatterbox from './containers/chatterbox/Chatterbox';

if (localStorage.jwtToken) {
  //Set auth tokenß
  setAuthToken(localStorage.jwtToken);
  //Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set current user
  store.dispatch(setCurrentUser(decoded));

  //logout user if token has expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='App'>
        <NavBar />
        <div>
          <Route exact path='/' component={Register} />
        </div>
        <div className=''>
          <Route exact path='/login' component={Login} />
        </div>
        <Switch>
          <PrivateRoute exact path='/chat' component={Chatterbox} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
