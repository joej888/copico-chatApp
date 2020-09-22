////****** CHAT TABLE IS DEFINED HERE    *****//
////****** ----------------------*************//

const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user');
const Chat = db.define('chat', {
  userId: {
    type: Sequelize.INTEGER,
  },
  chatContent: {
    type: Sequelize.STRING,
  },
}, {
  freezeTableName: true
}, { timestamps: true });
User.hasMany(Chat, { foreignKey: 'userId' });
Chat.belongsTo(User, { as: 'user', foreignKey: 'userId' });
module.exports = Chat;