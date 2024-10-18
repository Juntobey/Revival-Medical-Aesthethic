'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Insert default roles
    await queryInterface.bulkInsert('Roles', [
      { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'patient', createdAt: new Date(), updatedAt: new Date() },
      { name: 'doctor', createdAt: new Date(), updatedAt: new Date() },
    ], { ignoreDuplicates: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  },
};
