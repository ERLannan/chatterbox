import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {
  const messageContent = !props.me ? (
    <div className='chat-message-container px-3'>
      <div className='d-flex flex-row justify-content-between'>
        <div className=''>
          <img
            className='chat-profile-image img-fluid rounded-circle mr-2'
            src={props.avatar}
            alt='Profile'
          />
        </div>
        <div className=' chat-message-text'>
          <p className='mb-0 text-white'>
            <small>
              {props.name} - {props.publishedtime}
            </small>
          </p>
          <p className='text-burstingblue bg-white rounded shadow pl-1'>
            {props.text}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className='chat-message-container px-3'>
      <div className='d-flex flex-row justify-content-between'>
        <div className='chat-message-text d-flex flex-column'>
          <p className='mb-0 text-white align-self-end'>
            <small>
              {props.name} - {props.publishedtime}
            </small>
          </p>
          <p className='text-white bg-teal rounded shadow p-2'>{props.text}</p>
        </div>
        <div className=''>
          <img
            className='chat-profile-image img-fluid rounded-circle ml-2'
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
