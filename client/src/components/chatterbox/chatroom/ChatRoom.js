import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// import Message from './chatroom/Message';
import Chat from './Chat';

export class ChatRoom extends Component {
  state = {
    message: ''
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
    this.setState({ message: '' });
    this.props.publishMessage(this.state.message);
  };

  render() {
    const msgs = this.props.messages;

    return (
      <Fragment>
        <Chat
          messages={msgs}
          id={this.props.id}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          message={this.state.message}
        />
        <div className=' message-input fluid-container bg-darkgrey m-0'>
          <form onSubmit={this.onSubmit} className='m-0 p-0'>
            <div className='flex-group d-flex py-2'>
              <input
                type='text'
                className='form-control ml-3 mr-2'
                id='inlineFormInput'
                placeholder='Message'
                name='message'
                value={this.state.message}
                onChange={this.onChange}
              />
              <button type='submit' className='btn btn-brightred mr-2'>
                Send
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

ChatRoom.propTypes = {
  messages: PropTypes.array.isRequired,
  publishMessage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default ChatRoom;
