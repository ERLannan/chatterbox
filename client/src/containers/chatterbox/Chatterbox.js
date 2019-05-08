import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PubNubReact from 'pubnub-react';
import { publish, subscribe } from '../../config/keys';

// import PropTypes from 'prop-types';

import ChatRoom from '../../components/chatterbox/chatroom/ChatRoom';

export class Chatterbox extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props.auth;

    this.pubnub = new PubNubReact({
      publishKey: publish,
      subscribeKey: subscribe,
      authKey: localStorage.jwtToken,
      uuid: user.id
    });

    this.pubnub.init(this);
  }

  state = {
    messages: [],
    id: ''
  };

  addMessage = msg => {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  };

  componentWillMount() {
    const { user } = this.props.auth;
    this.setState({
      id: user.id
    });

    this.pubnub.history(
      {
        channel: 'global_channel',
        count: 10 // 100 is the default
      },
      (status, response) => {
        response.messages.forEach(msg => {
          this.addMessage(msg);
        });
      }
    );

    this.pubnub.subscribe({
      channels: ['global_channel']
    });

    this.pubnub.getMessage('global_channel', msg => {
      this.addMessage(msg);
    });
  }
  componentDidMount() {}

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ['global_channel']
    });
  }

  onPublishHandler = msg => {
    const { user } = this.props.auth;
    this.pubnub.publish({
      message: {
        text: msg,
        data: {
          name: user.name,
          avatar: user.avatar,
          id: this.state.id
        }
      },
      channel: 'global_channel'
    });
  };

  render() {
    const messages = [...this.state.messages];
    return (
      <div className='chat-room bg-darkgrey mx-auto'>
        <div className='row m-0'>
          <div className='col-md-2'>something</div>
          <div className='col-md-8 col-12 bg-darkgrey chat-container'>
            <ChatRoom
              messages={messages}
              publishMessage={this.onPublishHandler}
              id={this.state.id}
            />
          </div>
          <div className='col-md-2'>something</div>
        </div>
      </div>
    );
  }
}

Chatterbox.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Chatterbox);

// testing json for use in the PubNub debug console
// {"text":"hello from the console!","data":{"name":"PubNub Console", "avatar":"http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802", "id":"pnconsole"}}
