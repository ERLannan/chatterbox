import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {
  const messageContent = !props.me ? (
    <div className='chat-message-container px-1'>
      <div className='d-flex flex-row justify-content-start'>
        <div className='chat-profile-img-container d-none d-lg-flex justify-content-center'>
          <img
            className='chat-profile-image img-fluid rounded-circle'
            src={props.avatar}
            alt='Profile'
          />
        </div>
        <div className='chat-message-text d-flex flex-column'>
          <p className='mb-0 text-white'>
            <small>
              {props.name} - {props.publishedtime}
            </small>
          </p>
          <p className='text-burstingblue bg-white rounded shadow p-1'>
            {props.text}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className='chat-message-container px-1'>
      <div className='d-flex flex-row justify-content-end'>
        <div className='chat-message-text d-flex flex-column'>
          <p className='mb-0 text-white'>
            <small>
              {props.name} - {props.publishedtime}
            </small>
          </p>
          <p className='text-white bg-teal rounded shadow p-1'>{props.text}</p>
        </div>
        <div className='chat-profile-img-container d-none d-lg-flex justify-content-center'>
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
