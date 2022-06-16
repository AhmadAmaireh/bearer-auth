'use strict';

const express = require('express');
const authRouter = express.Router();

// const basicAuth = require('../middleware/basic.js');
const basicAuth = require('../middleware/basic');
// const bearerAuth = require('../middleware/bearer.js');
const bearerAuth = require('../middleware/bearer');
// console.log(basicAuth);
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret
} = require('./handlers.js');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

module.exports = authRouter;