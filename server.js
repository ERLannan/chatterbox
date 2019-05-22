const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const channels = require('./routes/api/channels');
const pnManager = require('./pubnub/pubnub-manager');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup and connect to DB
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('***      MongoDB Connected      ***');
  })
  .catch(err => console.log(`Error connecting to DB: ${err}`));

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);
app.use('/api/users', users);
app.use('/api/channels', channels);

pnManager.init();
// pnManager
//   .addChannelsToChannelGroup(
//     ['Chatterbox-News', 'Chatterbox-Patch-Notes', 'global_channel'],
//     'Chatterbox-Update-Community-Channels'
//   )
//   .then(res => {
//     console.log(`Success: ${res.statusCode}`);
//   })
//   .catch(err => {
//     console.log(`Error: ${err}`);
//   });

// pnManager
//   .removeChannelsFromChannelGroup(
//     ['global-channel'],
//     'Chatterbox-Update-Community-Channels'
//   )
//   .then(res => {
//     console.log(`Success: ${res.statusCode}`);
//   })
//   .catch(err => {
//     console.log(`Error: ${err}`);
//   });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`*** Server running on port ${port} ***`));
