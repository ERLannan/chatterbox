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
    console.log(`Token: ${localStorage.jwtToken}`);
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-5292021b-e55c-4080-a086-689389d143de',
      subscribeKey: 'sub-c-936f22c2-82cf-11e7-9034-1e9edc6dd7f6',
      authKey: localStorage.jwtToken,
      uuid: user.name,
      logVerbosity: true
    });
    this.testChannel = 'Chatterbox-Update-Community-Channels';
    this.pubnub.init(this);
  }

  state = {
    messages: [],
    id: '',
    presence: {},
    loading: true,
    currentChannel: 'global-channel',
    channelGroups: ['Chatterbox-Update-Community-Channels']
  };

  addMessage = msg => {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  };

  componentWillMount() {}

  componentDidMount = () => {
    setTimeout(() => {
      // this.setState({ loading: false });
      const { user } = this.props.auth;
      this.setState({
        id: user.id
      });
      this.pubnub.addListener({
        status: statusEvent => {
          // console.log(statusEvent);
          if (statusEvent.category === 'PNConnectedCategory') {
            this.setState({ loading: false });
            this.getHistoryAndPresence();
          }
        },
        message: message => {
          // handle message
          this.addMessage(message);
        },
        presence: presenceEvent => {
          if (presenceEvent.action === 'join') {
            let prevState = {};
            if (this.state.presence !== undefined) {
              prevState = { ...this.state.presence };
            }

            if (
              prevState[presenceEvent.channel] === undefined ||
              !prevState[presenceEvent.channel].includes(presenceEvent.uuid)
            ) {
              const newUserList = [presenceEvent.uuid];
              prevState[presenceEvent.channel] = newUserList;
              this.setState({ presence: prevState });
            }
          } else if (presenceEvent.action === 'leave') {
            const prevState = this.state.presence;
            if (presenceEvent.uuid !== this.pubnub.getUUID()) {
              const newUserList = prevState[presenceEvent.channel].filter(
                user => {
                  return user !== presenceEvent.uuid;
                }
              );
              prevState[presenceEvent.channel] = newUserList;
              this.setState({ presence: prevState });
            }
          }
        }
      });
      this.subscribeToChannelGroups([user.groups.defaultChannelGroup]);
    }, 3000);
  };

  componentWillUnmount() {
    const { user } = this.props.auth;
    this.pubnub.unsubscribe({
      channelGroups: [user.groups.defaultChannelGroup]
    });
  }

  onChannelSelectClickHandler = value => {
    console.log(value);
  };

  onPublishHandler = msg => {
    const { user } = this.props.auth;
    this.pubnub
      .publish({
        message: {
          text: msg,
          data: {
            name: user.name,
            avatar: user.avatar,
            id: this.state.id
          }
        },
        channel: this.state.currentChannel
      })
      .then(response => {
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render = () => {
    const messages = [...this.state.messages];
    // const pres = [...this.state.presence];
    console.log(this.state);
    let userList;
    let keys;
    if (!this.state.loading) {
      userList =
        this.state.presence[this.state.currentChannel] !== undefined ? (
          <UserList users={this.state.presence[this.state.currentChannel]} />
        ) : null;

      keys =
        this.state.presence !== undefined
          ? Object.keys(this.state.presence)
          : null;
    }

    const content = this.state.loading ? (
      <div className='align-center pt-5 mt-5'>
        <Spinner />
      </div>
    ) : (
      <div className='d-flex flex-row justify-content-between chat-room'>
        <div className='container pt-2 room-list d-none d-lg-block'>
          <h5>Rooms</h5>
          <RoomList
            rooms={keys}
            onChannelSelect={this.onChannelSelectClickHandler}
          />
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
  };
  /// PubNub methods
  getHistoryAndPresence = () => {
    this.getHereNow([...this.state.channelGroups]);
    this.getHistory(this.state.currentChannel, 20);
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

  subscribeToChannelGroups = channelGroups => {
    this.pubnub.subscribe({
      channelGroups: [...channelGroups],
      withPresence: true
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
        prevState[presence.channel] = newUserList;
        this.setState({ presence: prevState });
      }
    });
  };

  getHistory = (chanName, count) => {
    this.pubnub.history(
      {
        channel: chanName,
        count: count
      },
      (status, response) => {
        console.log('History -----');
        console.log(response);
        console.log(status);
        response.messages.forEach(msg => {
          this.addMessage(msg);
        });
      }
    );
  };

  getHereNow = channelGroups => {
    this.pubnub.hereNow(
      {
        channelGroups: channelGroups
      },
      (status, response) => {
        const channelPres = {};
        // console.log(status);
        // console.log(response);
        Object.keys(response.channels).forEach(chName => {
          const users = response.channels[chName].occupants.map(
            occupant => occupant.uuid
          );
          channelPres[chName] = users;
          this.setState({ presence: channelPres, loading: false });
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
