const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  creator: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
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
  publicchannels: [
    {
      name: {
        type: String,
        required: true
      },
      pnName: {
        type: String,
        required: true
      }
    }
  ],
  privatechannels: [
    {
      name: {
        type: String,
        required: true
      },
      pnName: {
        type: String,
        required: true
      }
    }
  ],
  publichchannelgroup: {
    type: String,
    required: true
  },
  memberspresencechannel: {
    type: String,
    required: true
  },
  protectedchannelgroup: {
    type: String,
    required: true
  },
  admins: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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
  ],
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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

module.exports = Channel = mongoose.model('channels', ChannelSchema);
