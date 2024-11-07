module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Support', {
        support_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        phone_number: Sequelize.STRING,
        subject: Sequelize.DATE,
        message: Sequelize.STRING,
        status: Sequelize.STRING,
        handled_by: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        user: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Support');
    }
  };
  