'use strict';

const { db } = require('./src/auth/models/index');

db.sync()
  .then(() => {

    require('./src/server').start(process.env.PORT);
  });