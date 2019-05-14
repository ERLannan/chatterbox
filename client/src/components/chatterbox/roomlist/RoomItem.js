import React from 'react';
import PropTypes from 'prop-types';

function RoomItem(props) {
  return (
    <div
      className='d-flex flex-column my-2 align-items-center bg-darkteal rounded'
      onClick={() => props.onChannelSelect(props.room)}
    >
      #{props.room}
      {/* <label className='m-0 p-0 pl-2 user-list-label text-center text-white w-100'>
      </label> */}
    </div>
  );
}

RoomItem.propTypes = {
  room: PropTypes.string.isRequired,
  onChannelSelect: PropTypes.func.isRequired
};

export default RoomItem;
