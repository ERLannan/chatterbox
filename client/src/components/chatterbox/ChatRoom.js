import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

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
    const messagesContent = msgs
      .map(msg => {
        const { text } = msg.message !== undefined ? msg.message : msg.entry;
        const { name, avatar } =
          msg.message !== undefined ? msg.message.data : msg.entry.data;

        let tod = 'am';
        let hour = new Date(msg.timetoken / 10000).getHours();
        const min = new Date(msg.timetoken / 10000).getMinutes();

        if (hour > 12) {
          hour = hour - 12;
          tod = 'pm';
        }
        const time = `${hour}:${min} ${tod}`;
        console.log(msg.publisher);
        console.log(this.props.pnID);
        return (
          <Message
            me={msg.publisher === this.props.pnID ? true : false}
            key={msg.timetoken}
            name={name}
            avatar={avatar}
            text={text}
            publishedtime={time}
            // publishedtime={Date.now().toString()}
          />
        );
      })
      .reverse();
    return (
      <div className='chat-room bg-brightred'>
        <div className='container-fluid h-100'>
          <div className='row h-100'>
            <div className='col-2 bg-dark'>
              <p>something</p>
            </div>
            <div className='col-8 h-100 shadow bg-darkgrey chat-container h-100'>
              <div className='row d-block flex flex-column h-100 pb-4'>
                <div className='messages-list align-self-stretch'>
                  {messagesContent}
                </div>
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
          </div>
        </div>
      </div>
    );
  }
}

ChatRoom.propTypes = {
  messages: PropTypes.array.isRequired,
  publishMessage: PropTypes.func.isRequired,
  pnID: PropTypes.string.isRequired
};

export default ChatRoom;
