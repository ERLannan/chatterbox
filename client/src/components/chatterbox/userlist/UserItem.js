import React from 'react';
import PropTypes from 'prop-types';

function UserItem(props) {
  return (
    <div className='d-flex flex-row my-2 align-items-center bg-darkteal rounded'>
      {/* <img
        className='user-list-img img-fluid rounded-circle p-1'
        src='http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802'
      /> */}
      <label className='m-0 p-0 pl-2 user-list-label text-white'>
        {props.name}
      </label>
    </div>
  );
}

UserItem.propTypes = { name: PropTypes.string.isRequired };

export default UserItem;
