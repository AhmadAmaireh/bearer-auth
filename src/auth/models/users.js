'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = (sequelize, DataTypes) => {
  const users = sequelize.define('postgres', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({
          username: this.username
        }, process.env.SECRET);
      }
    }
  });

  users.beforeCreate= async function(password){
   
    let hashedPass =await bcrypt.hash(password, 10);
  
    return hashedPass;
  };

  users.authenticateBasic = async function (username, password) {
    const user = await this.findOne({
      where :{username:username}
    });
    
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error('Invalid User');
  }

  users.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = this.findOne({where:{username: parsedToken.username}});
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return users;
}

module.exports = userSchema;