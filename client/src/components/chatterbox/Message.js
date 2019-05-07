import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {
  const messageContent = !props.me ? (
    <div className='chat-message-container px-3'>
      <div className='row'>
        <div className='col-md-1'>
          <img
            className='chat-profile-image img-fluid rounded-circle '
            src={props.avatar}
            alt='Profile'
          />
        </div>
        <div className='col-md-11 chat-message-text'>
          <p className='mb-0 text-burstingblue'>
            <small>
              {props.name} - {props.publishedtime}
            </small>
          </p>
          <p className='text-burstingblue bg-white rounded shadow p-2'>
            {props.text}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className='chat-message-container px-3'>
      <div className='row'>
        <div className='col-md-11 chat-message-text d-flex flex-column'>
          <p className='mb-0 text-burstingblue align-self-end'>
            <small>
              {props.name} - {props.publishedtime}
            </small>
          </p>
          <p className='text-white bg-teal rounded shadow p-2'>{props.text}</p>
        </div>
        <div className='col-md-1'>
          <img
            className='chat-profile-image img-fluid rounded-circle'
            src={props.avatar}
            alt='Profile'
          />
        </div>
      </div>
    </div>
  );

  return <div>{messageContent}</div>;
}

Message.defaultProps = {
  me: false
};

Message.propTypes = {
  me: PropTypes.bool,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  publishedtime: PropTypes.string.isRequired
};
