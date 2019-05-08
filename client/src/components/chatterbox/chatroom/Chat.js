import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
function Chat(props) {
  const msgs = props.messages;
  const messagesContent = msgs
    .map(msg => {
      const { text } = msg.message !== undefined ? msg.message : msg.entry;
      const { name, avatar, id } =
        msg.message !== undefined ? msg.message.data : msg.entry.data;

      let tod = 'am';
      let hour = new Date(msg.timetoken / 10000).getHours();
      const min = new Date(msg.timetoken / 10000).getMinutes();

      if (hour > 12) {
        hour = hour - 12;
        tod = 'pm';
      }
      const time = `${hour}:${min} ${tod}`;
      return (
        <Message
          me={id === props.id ? true : false}
          key={msg.timetoken}
          name={name}
          avatar={avatar}
          text={text}
          publishedtime={time}
        />
      );
    })
    .reverse();

  return (
    <div className='messages-list align-self-stretch'>{messagesContent}</div>
  );
}

Chat.propTypes = {
  id: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired
};

export default Chat;
