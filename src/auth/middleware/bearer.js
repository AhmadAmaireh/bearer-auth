'use strict';

const { users } = require('../models/index');
module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login') }
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token).then(async(x)=>{
      req.user = x;
      next();
    })
    .catch((e)=>{
      res.status(403).send('Invalid Login');
    })

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}