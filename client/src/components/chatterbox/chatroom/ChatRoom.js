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
        <div className='message-input fluid-container'>
          <form onSubmit={this.onSubmit}>
            <div className=' form-group d-flex justify-content-center p-1 mt-2'>
              <div className='col-10'>
                <input
                  type='text'
                  className='form-control mb-2'
                  id='inlineFormInput'
                  placeholder='Message'
                  name='message'
                  value={this.state.message}
                  onChange={this.onChange}
                />
              </div>

              <div className='col-2'>
                <button
                  type='submit'
                  className='btn btn-block btn-brightred mb-2'
                >
                  Send
                </button>
              </div>
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

{
  /* <div className='row'>
          <div className='col-2 bg-dark'>
            <p>something</p>
          </div>
          <div className='col-8 shadow bg-darkgrey chat-container'>
            <div className='row d-block flex flex-column'>
              {<Chat messages={msgs} id={this.props.id} />}
              <div className='align-bottom'>
                <form onSubmit={this.onSubmit}>
                  <div className=' form-group d-flex justify-content-center p-1 mt-2'>
                    <div className='col-10'>
                      <input
                        type='text'
                        className='form-control mb-2'
                        id='inlineFormInput'
                        placeholder='Message'
                        name='message'
                        value={this.state.message}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='col-2'>
                      <button
                        type='submit'
                        className='btn btn-block btn-brightred mb-2'
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='col-2 bg-dark'>
            <p>something</p>
          </div>
        </div> */
}
