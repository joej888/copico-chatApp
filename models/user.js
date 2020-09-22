
////****** USER TABLE IS DEFINED HERE    *****//
////****** ----------------------*************//

const Sequelize = require('sequelize');
const db = require('../config/database')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  }
}, { freezeTableName: true });
module.exports = User;