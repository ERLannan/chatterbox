const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  channelGroupName: {
    type: String,
    required: true
  },
  membersPresenceChannelGroup: {
    type: String,
    required: true
  },
  protectedChannelGroup: {
    type: String,
    required: true
  },
  admins: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      inboundChannel: {
        type: String,
        required: true
      },
      presenceChannel: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      }
    }
  ]
});
