'use strict';

const {
  users
} = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    users.beforeCreate(req.body.password).then(async(hashedPass) => {
      let userRecord = await users.create({username:req.body.username,password:hashedPass});
      const output = {
        user: userRecord,
        token: userRecord.token
      };
      res.status(201).json(userRecord);
  })
  .catch((e) => {
  })
  } catch (e) {
    console.error(e);
    next(e);
  }
}
async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    let come=req.user;
    res.status(201).json(req.user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}