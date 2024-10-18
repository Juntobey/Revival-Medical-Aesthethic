'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('12345', 10);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      email: 'admin@example.com',
    });
  },
};
