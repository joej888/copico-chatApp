'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'chat', 
      'createdAt', 
      {
        type: Sequelize.DATE
      }
    );

    await queryInterface.addColumn(
      'chat', 
      'updatedAt', 
      {
        type: Sequelize.DATE
      }
    ) 
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'chat', // name of Source model
      'createdAt' // key we want to remove
    );
    await queryInterface.removeColumn(
      'chat', // name of Source model
      'updatedAt' // key we want to remove
    )
  }
};
