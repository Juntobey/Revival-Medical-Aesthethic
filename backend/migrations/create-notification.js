module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Notifications', {
        notifications_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        created_by: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        message: Sequelize.STRING,
        created_at: Sequelize.DATE,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Notifications');
    }
  };
  