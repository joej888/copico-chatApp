'use strict';

//// Association "User has may chats is set here"
////*********************************************** */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'chat', // name of Source model
      'userId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'user', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'chat', // name of Source model
      'userId' // key we want to remove
    )
  }
};
