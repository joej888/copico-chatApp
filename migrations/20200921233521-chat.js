'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chat', 
    { id: {type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chatContent: {
      type: Sequelize.STRING,
    }});

  },
  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chat');
    console.log("chat table dropped!");
  }
};
