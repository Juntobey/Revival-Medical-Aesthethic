'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProfiles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.STRING,
      },
      emergencyContactName: {
        type: Sequelize.STRING,
      },
      emergencyContactNumber: {
        type: Sequelize.STRING,
      },
      meta: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}, // Initialize with an empty object
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserProfiles');
  },
};
