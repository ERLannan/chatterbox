import React from 'react';
import PropTypes from 'prop-types';
import RoomItem from './RoomItem';

function RoomList(props) {
  const rooms = props.rooms.map(room => (
    <RoomItem key={room} room={room} onChannelSelect={props.onChannelSelect} />
  ));

  return rooms;
}

RoomList.propTypes = {
  rooms: PropTypes.array.isRequired,
  onChannelSelect: PropTypes.func.isRequired
};

export default RoomList;
