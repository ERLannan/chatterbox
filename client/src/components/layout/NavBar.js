import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, loginUser } from '../../actions/authActions';
// import TextFieldGroup from '../../common/ui-components/TextFieldGroup';gfd

class Navbar extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: [event.target.value] });
  };

  onSubmit = event => {
    event.preventDefault();
    const usr = {
      email: this.state.email.toString(),
      password: this.state.password.toString()
    };

    this.props.loginUser(usr, this.props.history);
  };

  render() {
    const { isAuthenticated, isLoginScreen, user } = this.props.auth;
    // const { errors } = this.state;
    const onLogoutClick = event => {
      event.preventDefault();
      this.props.logoutUser();
      //      window.location.href = '/login';
    };

    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <img
          src={user.avatar}
          alt={user.name}
          title='you must have a Gravatar connected to your email to display an image'
          className='latest-profiles-img rounded-circle img-fluid'
        />
        <li>
          <Link onClick={onLogoutClick} className='nav-link ml-2' to='/login'>
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = isLoginScreen ? null : (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className='form-row'>
            <div className='form-row'>
              <div className='col'>
                <input
                  name='email'
                  type='text'
                  className='form-control'
                  placeholder='Email'
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className='col'>
                <input
                  name='password'
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button type='submit' className='btn btn-brightred'>
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    );

    return (
      // <div >className={classes.Navbar}>

      <div>
        <nav className='main-navbar navbar fixed-top navbar-expand-sm navbar-dark bg-darkgrey mb-4'>
          <div className='container'>
            <Link className='navbar-brand' to='/'>
              Chatterbox
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#mobile-nav'
            >
              <span className='navbar-toggler-icon' />
            </button>

            <div className='collapse navbar-collapse' id='mobile-nav'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  {/* <Link className='nav-link' to='/profiles'>
                    Developers
                  </Link> */}
                </li>
              </ul>

              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, loginUser }
)(Navbar);
