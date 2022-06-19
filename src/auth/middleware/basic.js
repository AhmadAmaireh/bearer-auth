'use strict';

const base64 = require('base-64');
const { users } = require('../models/index');

module.exports = async (req, res, next) => {

   if (!req.headers.authorization) {
    next()
     return _authError(); }

  let basic = req.headers.authorization.split(' ');
  let encodedBasic=basic.pop();
  let decodedValue = base64.decode(encodedBasic);
  let [username, pass] =decodedValue.split(':');
  try {
    
    req.user = await users.authenticateBasic(username, pass).then((x)=>{
      req.user=x;
      next();
    })
    .catch((e) => {
      res.status(403).send('Invalid Login');
    });

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

}