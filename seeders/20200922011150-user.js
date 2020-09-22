'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [{
      name: 'Deny Mathew',
      email:'deny@gmail.com',
      password:'deny'
     },
     {
      name: 'Admin',
      email:'admin@gmail.com',
      password:'admin'
     },
     {
      name: 'User',
      email:'user@gmail.com',
      password:'user'
     },
     {
      name: 'Emmy',
      email:'emmy@gmail.com',
      password:'emmy'
     },
     {
      name: 'Pattison',
      email:'pattison@gmail.com',
      password:'pattison'
     },
     {
      name: 'focaloid',
      email:'hr@focaloid.com',
      password:'focaloid'
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
