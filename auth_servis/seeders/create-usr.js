'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('adminpass', 10);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@test.raf',
        password: hashedPassword,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {

  },
};