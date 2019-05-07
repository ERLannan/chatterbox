import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, setLoginScreen } from '../../actions/authActions';
import TextFieldGroup from '../../common/ui-components/TextFieldGroup';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/chat');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/chat');
    }
    this.props.setLoginScreen(true);
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
    const { errors } = this.state;

    return (
      <div className='login landing d-flex flex-column justify-content-start'>
        <div className='container mt-5 pt-5'>
          <div className='row justify-content-between'>
            <div className='col-md-4 d-none d-md-block' />
            <div className='col-12 col-lg-4 pl-5'>
              <h1 className='display-4 text-center font-weigth-bold'>Log In</h1>
              <p className='lead text-center'>
                Sign in to your Chatterbox account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='Email Address'
                  name='email'
                  type='email'
                  value={this.state.email.toString()}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={this.state.password.toString()}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input
                  type='submit'
                  className='btn btn-brightred btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setLoginScreen: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, setLoginScreen }
)(Login);
