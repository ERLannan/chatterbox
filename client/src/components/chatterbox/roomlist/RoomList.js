import React from 'react';
import PropTypes from 'prop-types';
import RoomItem from './RoomItem';

function RoomList(props) {
  console.log(props);
  const rooms = props.rooms.map(room => <RoomItem key={room} room={room} />);

  return rooms;
}

RoomList.propTypes = { rooms: PropTypes.array.isRequired };

export default RoomList;
