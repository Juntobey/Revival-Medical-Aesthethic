'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ImageGalleries', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userProfileId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserProfiles',
          key: 'id',
        },
        allowNull: false,
      },
      beforeImagePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      afterImagePath: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('ImageGalleries');
  },
};
