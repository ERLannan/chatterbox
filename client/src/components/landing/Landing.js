import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
class Landing extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div className='landing fullpage-container bg-secondary d-flex flex-column justify-content-center'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-8 text-center py-4'>
              <h1 className='display-1 mb-4 font-bold'>Chatterbox</h1>
              <p className='lead'> Chat app for the everyday user</p>
              <hr classname='text-info' />
              <Link to='/register' className='btn btn-lg btn-info mr-2'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-lg btn-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
