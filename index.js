'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index');

db.sync()
  .then(() => {

    // Start the web server
    require('./src/server').start(process.env.PORT);
  });