import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PubNubReact from 'pubnub-react';
import { publish, subscribe } from '../../config/keys';

// import PropTypes from 'prop-types';

import ChatRoom from '../../components/chatterbox/ChatRoom';

export class Chatterbox extends Component {
  constructor(props) {
    super(props);

    console.log(localStorage.jwtToken);

    this.pubnub = new PubNubReact({
      publishKey: publish,
      subscribeKey: subscribe,
      authKey: localStorage.jwtToken,
      uuid: this.props.auth.name
    });

    this.pubnub.init(this);
  }

  state = {
    messages: []
  };

  addMessage = msg => {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  };

  componentWillMount() {
    this.pubnub.history(
      {
        channel: 'global_channel',
        count: 10 // 100 is the default
      },
      (status, response) => {
        response.messages.forEach(msg => {
          console.log(msg);
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
    console.log(msg);

    const { user } = this.props.auth;
    console.log(user);
    this.pubnub.publish({
      message: {
        text: msg,
        data: {
          name: user.name,
          avatar: user.avatar
        }
      },
      channel: 'global_channel'
    });
  };

  render() {
    // const messages = this.pubnub.getMessage('global_channel');
    const messages = [...this.state.messages];
    console.log(messages);
    return (
      <Fragment>
        <ChatRoom
          messages={messages}
          publishMessage={this.onPublishHandler}
          pnID={this.pubnub.getUUID()}
        />
      </Fragment>
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
