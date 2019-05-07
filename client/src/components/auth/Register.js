import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, setLoginScreen } from '../../actions/authActions';
import TextFieldGroup from '../../common/ui-components/TextFieldGroup';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/chat');
    }

    this.props.setLoginScreen(false);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = event => {
    const temp = event.target.value;
    let value = Array.isArray(temp)
      ? event.target.value[0]
      : event.target.value;
    this.setState({ [event.target.name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.name.toString(),
      email: this.state.email.toString(),
      password: this.state.password.toString(),
      password2: this.state.password2.toString()
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='register landing d-flex flex-column justify-content-start'>
        <div className='container mt-5 pt-5'>
          <div className='row justify-content-between'>
            <div className='col-md-4 d-none d-md-block' />
            <div className='col-12 col-lg-4 pl-5'>
              <h1 className='display-4 text-center'>Sign Up</h1>
              <p className='lead text-center'>Create your Chatterbox account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextFieldGroup
                  placeholder='Email Address'
                  name='email'
                  type='email'
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info='This site uses Gravatar so if you want a profile image, use
                  a Gravatar email'
                />

                <TextFieldGroup
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder='Confirm Password'
                  name='password2'
                  type='password'
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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
  { registerUser, setLoginScreen }
)(withRouter(Register));
