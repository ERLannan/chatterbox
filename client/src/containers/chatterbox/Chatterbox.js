import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PubNubReact from 'pubnub-react';
import { publish, subscribe } from '../../config/keys';

// import PropTypes from 'prop-types';

import ChatRoom from '../../components/chatterbox/chatroom/ChatRoom';
import UserList from '../../components/chatterbox/userlist/UserList';

export class Chatterbox extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props.auth;

    this.pubnub = new PubNubReact({
      publishKey: publish,
      subscribeKey: subscribe,
      authKey: localStorage.jwtToken,
      uuid: user.name
    });

    this.pubnub.init(this);
  }

  state = {
    messages: [],
    id: '',
    presence: {}
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
        count: 20 // 100 is the default
      },
      (status, response) => {
        response.messages.forEach(msg => {
          this.addMessage(msg);
        });
      }
    );

    this.pubnub.subscribe({
      channels: ['global_channel'],
      withPresence: true
    });

    this.pubnub.hereNow(
      {
        channels: ['global_channel'],
        includeUUIDs: true
      },
      (status, response) => {
        const channelPres = {};
        Object.keys(response.channels).forEach(chName => {
          const users = response.channels[chName].occupants.map(
            occupant => occupant.uuid
          );
          channelPres[chName] = users;
          console.log(channelPres);
          this.setState({ presence: channelPres });
        });
      }
    );

    this.pubnub.getPresence('global_channel', presence => {
      console.log(presence);
      if (presence.action === 'join') {
        const prevState = this.state.presence;
        prevState[presence.channel].push(presence.uuid);
        this.setState({ presence: prevState });
      } else if (presence.action === 'leave') {
        const prevState = this.state.presence;
        const newUserList = prevState[presence.channel].filter(user => {
          return user !== presence.uuid;
        });
        console.log(newUserList);
        prevState[presence.channel] = newUserList;
        this.setState({ presence: prevState });
      }
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
    // const presence = this.pubnub.getPresence('global_channel');
    const userList =
      this.state.presence['global_channel'] !== undefined ? (
        <UserList users={this.state.presence['global_channel']} />
      ) : null;

    return (
      <div className='fluid-container fullpage-container bg-secondary text-white pt-5'>
        <div className='d-flex flex-row justify-content-between chat-room'>
          <div className='fluid-container user-list'>{userList}</div>
          <div
            className='chat-container fluid-container d-flex flex-column justify-content-center'
            // style='width: 70%; background-color:cornflowerblue'
          >
            <ChatRoom
              messages={messages}
              publishMessage={this.onPublishHandler}
              id={this.state.id}
            />
          </div>

          <div className='container pt-2 user-list'>{userList}</div>
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
