import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';

import ChatRoom from '../../components/chatterbox/ChatRoom';

export class Chatterbox extends Component {
  static propTypes = {};

  render() {
    return (
      <Fragment>
        <ChatRoom />
      </Fragment>
    );
  }
}

export default Chatterbox;
