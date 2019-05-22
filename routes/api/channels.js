const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Channel = require('../../models/Channel');

//@route      GET api/channels/
//@desc       Get Channels for current user
//@access     Protected
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {}
);

//@route      POST api/channels/create
//@desc       Create new channel
//@access     Protected
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //For now channels with the same name will be created - The main differentiator is the time at which it's created. This is highly unlikely to happen

    let chanGroupName = req.body.channelName.split(' ').join('');
    chanGroupName = `${chanGroupName}-${Date.now()}`;

    const channelData = {};

    channelData.creator = {
      user: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar
    };
    channelData.admins = [
      { user: req.user.id, name: req.user.name, avatar: req.user.avatar }
    ];
    channelData.members = [
      { user: req.user.id, name: req.user.name, avatar: req.user.avatar }
    ];
    // channelName is how it will be displayed to the user
    if (req.body.channelName) channelData.name = req.body.channelName;
    if (req.body.description) channelData.description = req.body.description;
    if (req.body.image) channelData.image = req.body.image;

    // channelGroupName is the name used on the PubNub platform
    channelData.publichchannelgroup = chanGroupName;
    // Channel to check and see who is online
    channelData.memberspresencechannel = `${chanGroupName}-presence`;
    // Private channels for only Admins to post in - visable to all members of the group
    channelData.protectedchannelgroup = `${chanGroupName}-protected`;

    // Default channels for both the public and private groups,
    // might change it to only creating a public channel at default
    channelData.publicchannels = [{ name: 'Welcome', pnName: 'welcome' }];
    channelData.privatechannels = [
      { name: 'Announcements', pnName: 'announcements' }
    ];

    // Create and save the new channel, then add it to the list of channels owed by the creator
    new Channel(channelData)
      .save()
      .then(channel => {
        User.findById(req.user.id)
          .then(user => {
            user.channels.unshift({
              channel: channel,
              name: channel.name
            });
            user
              .save()
              .then(user => res.json({ user: user, channel: channel }))
              .catch();
          })
          .catch(err =>
            res.status(404).json({ channeladdfail: 'Failed to find user' })
          );
      })
      .catch(err =>
        res.status(404).json({ channelcreatefail: 'Failed to create channel' })
      );

    console.log(channelData);
  }
);

//@route      POST api/channels/admin/:user_id
//@desc       Add admin to channel
//@access     Protected
router.post(
  '/admin/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {}
);

//remove admin
//@route      DELETE api/channels/admin/:user_id
//@desc       Remove admin to channel
//@access     Protected
router.delete(
  '/admin/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {}
);

//@route      POST api/channels/room
//@desc       Add room to channel
//@access     Protected - Requires logged in and Admin to Channel
router.post(
  '/room',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {}
);

//@route      DELETE api/channels/room/:room_id
//@desc       Add room to channel
//@access     Protected - Requires logged in and Admin to Channel
router.delete(
  '/room/room_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {}
);

//create invite link
//accept
//reject

module.exports = router;
