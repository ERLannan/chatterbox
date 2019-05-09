import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

function UserList(props) {
  const users = props.users.map(name => <UserItem key={name} name={name} />);

  return users;
}

UserList.propTypes = { users: PropTypes.array.isRequired };

export default UserList;
