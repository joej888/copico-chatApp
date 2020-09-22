'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**  * Create Table commands here.  **/
     await queryInterface.createTable('user', 
     { id: 
      {type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name:{
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      validate : {
          isEmail: true,
          unique: true
      }},
      password: {
        type: Sequelize.TEXT,
        validate : {
            notEmpty: true
        }
      }
    }
   );
  },
    

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
    console.log("User table dropped!");
    }
};
