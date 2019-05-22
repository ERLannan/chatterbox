var PubNub = require('pubnub');

const { publish, subscribe, secret } = require('../config/keys');
const pubnub = new PubNub({
  publishKey: publish,
  subscribeKey: subscribe,
  secretKey: secret,
  uuid: 'chatterboxserver'
});

pnManager = {
  init: () => {
    pubnub.addListener({
      status: function(statusEvent) {
        if (statusEvent.category === 'PNConnectedCategory') {
        }
      },
      message: function(msg) {
        console.log(msg.message.text);
      }
    });
  },
  authorizeToken: (jwtToken, channelGroups = undefined) => {
    console.log(jwtToken);
    return new Promise((resolve, reject) => {
      pubnub.grant(
        {
          channels: ['global_channel'],
          channelGroups: [
            'Chatterbox-Update-Community-Channels',
            'Chatterbox-Update-Community-Channels-pnpres'
          ],
          authKeys: [jwtToken],
          ttl: 1440, // 0 for infinite
          read: true, // false to disallow
          write: true, // false to disallow
          manage: false // false to disallow
        },
        function(status) {
          if (status.error) {
            reject(Error(status.error));
          } else {
            pubnub.grant(
              {
                channels: ['global-channel'],
                authKeys: [jwtToken],
                ttl: 1440, // 0 for infinite
                read: true, // false to disallow
                write: true, // false to disallow
                manage: false // false to disallow
              },
              function(status) {
                if (status.error) {
                  reject(Error(status.error));
                } else {
                  resolve(status);
                }
              }
            );
          }
        }
      );
    });
  },
  addChannelsToChannelGroup: (channels, groupName) => {
    return new Promise((resolve, reject) => {
      pubnub.channelGroups.addChannels(
        {
          channels: [...channels],
          channelGroup: groupName
        },
        function(status) {
          if (status.error) {
            console.log(status);
            reject(Error(status.error));
          } else {
            resolve(status);
          }
        }
      );
    });
  },
  removeChannelsFromChannelGroup: (channels, groupName) => {
    return new Promise((resolve, reject) => {
      pubnub.channelGroups.removeChannels(
        {
          channels: [...channels],
          channelGroup: groupName
        },
        function(status) {
          if (status.error) {
            console.log('operation failed w/ error:', status);
            reject(Error(status.error));
          } else {
            resolve(status);
          }
        }
      );
    });
  }
};

module.exports = pnManager;
