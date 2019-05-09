import React from 'react';
import PropTypes from 'prop-types';

function RoomItem(props) {
  return (
    <div className='d-flex flex-column my-2 align-items-center bg-darkteal rounded'>
      <label className='m-0 p-0 pl-2 user-list-label text-center text-white w-100'>
        #{props.room}
      </label>
    </div>
  );
}

RoomItem.propTypes = { room: PropTypes.string.isRequired };

export default RoomItem;
