module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Notifications", {
      notifications_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      targeted_user_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),  // For targeted user IDs
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Notifications");
  },
};
