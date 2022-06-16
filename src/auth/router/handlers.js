'use strict';

const {
  users
} = require('../models/index');

async function handleSignup(req, res, next) {
  try {
    // console.log('mmmmmm',req.body.password);
    users.beforeCreate(req.body.password).then(async(hashedPass) => {
      // console.log("000000",hashedPass);
      // console.log(">>>>>>>>>",req.user);
      // next();
      let userRecord = await users.create({username:req.body.username,password:hashedPass});
      // const user = await users.getAll();
      // console.log({
      //   user
      // });
      const output = {
        user: userRecord,
        token: userRecord.token
      };
      // console.log('gggggg');
      res.status(201).json(userRecord);
  })
  .catch((e) => {
      // console.log("Invalid Tokenhhhh",e);
  })
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  // console.log('uuuuuuuuuuu',req.user);
  
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    // console.log({user});
    res.status(200).json(user);
  } catch (e) {
    // console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    let come=req.user;
    // console.log("mmm",come);
    // console.log({come});
    // const userRecords = await users.findAll({});
    // console.log({userRecords});
    // const list = userRecords.map(user => req.user);
    res.status(200).json(req.user);
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