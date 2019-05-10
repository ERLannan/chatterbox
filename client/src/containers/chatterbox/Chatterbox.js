import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PubNubReact from 'pubnub-react';
import Spinner from '../../common/ui-components/Spinner';

// import PropTypes from 'prop-types';

import ChatRoom from '../../components/chatterbox/chatroom/ChatRoom';
import UserList from '../../components/chatterbox/userlist/UserList';
import RoomList from '../../components/chatterbox/roomlist/RoomList';

export class Chatterbox extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props.auth;

    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-5292021b-e55c-4080-a086-689389d143de',
      subscribeKey: 'sub-c-936f22c2-82cf-11e7-9034-1e9edc6dd7f6',
      authKey: localStorage.jwtToken,
      uuid: user.name
    });

    this.pubnub.init(this);
  }

  state = {
    messages: [],
    id: '',
    presence: {},
    loading: true,
    currentChannel: 'global_channel'
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
    this.pubnub.addListener({
      status: statusEvent => {
        console.log(statusEvent);
        if (statusEvent.category === 'PNConnectedCategory') {
          this.setState({ loading: false });
          this.getHistoryAndPresence();
        }
      },
      message: function(message) {
        // handle message
      },
      presence: function(presenceEvent) {
        // handle presence
      }
    });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
      this.subscribeToChannel(this.state.currentChannel);
    }, 3000);
  }

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

    const userList =
      this.state.presence['global_channel'] !== undefined ? (
        <UserList users={this.state.presence['global_channel']} />
      ) : null;

    const keys =
      this.state.presence !== undefined
        ? Object.keys(this.state.presence)
        : null;

    const content = this.state.loading ? (
      <div className='align-center pt-5 mt-5'>
        <Spinner />
      </div>
    ) : (
      <div className='d-flex flex-row justify-content-between chat-room'>
        <div className='container pt-2 room-list d-none d-lg-block'>
          <h5>Rooms</h5>
          <RoomList rooms={keys} />
        </div>
        <div className='chat-container fluid-container d-flex flex-column justify-content-center'>
          <ChatRoom
            messages={messages}
            publishMessage={this.onPublishHandler}
            id={this.state.id}
          />
        </div>
        <div className='container pt-2 user-list text-center d-none d-md-block'>
          <h5>Users</h5>
          {userList}
        </div>
      </div>
    );

    return (
      <div className='fluid-container fullpage-container bg-secondary text-white pt-5'>
        {content}
      </div>
    );
  }
  /// PubNub methods
  getHistoryAndPresence = () => {
    const chanName = this.state.currentChannel;
    this.getHereNow(chanName);
    this.getHistory(chanName, 5);
    this.getPresence(chanName);
  };

  subscribeToChannel = chanName => {
    this.pubnub.subscribe({
      channels: [chanName],
      withPresence: true
    });

    this.pubnub.getMessage(chanName, msg => {
      this.addMessage(msg);
    });
  };

  getPresence = chanName => {
    this.pubnub.getPresence(chanName, presence => {
      if (presence.action === 'join') {
        const prevState = this.state.presence;

        if (
          prevState[presence.channel] === undefined ||
          !prevState[presence.channel].includes(presence.uuid)
        ) {
          prevState[presence.channel].push(presence.uuid);
          this.setState({ presence: prevState });
        }
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
  };

  getHistory = (chanName, count) => {
    this.pubnub.history(
      {
        channel: chanName,
        count: count // 100 is the default
      },
      (status, response) => {
        response.messages.forEach(msg => {
          this.addMessage(msg);
        });
      }
    );
  };

  getHereNow = chanName => {
    this.pubnub.hereNow(
      {
        channels: [chanName],
        includeUUIDs: true
      },
      (status, response) => {
        const channelPres = {};
        Object.keys(response.channels).forEach(chName => {
          const users = response.channels[chName].occupants.map(
            occupant => occupant.uuid
          );
          channelPres[chName] = users;
          this.setState({ presence: channelPres });
        });
      }
    );
  };
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
