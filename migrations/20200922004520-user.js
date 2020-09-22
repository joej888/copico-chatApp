'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'user', 
      'createdAt', 
      {
        type: Sequelize.DATE
      }
    );

    await queryInterface.addColumn(
      'user', 
      'updatedAt', 
      {
        type: Sequelize.DATE
      }
    ) 
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'user', // name of Source model
      'createdAt' // key we want to remove
    );
    await queryInterface.removeColumn(
      'user', // name of Source model
      'updatedAt' // key we want to remove
    )
  }
};
