module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Medical_Records', {
        record_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        patient_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        created_by: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        record_date: Sequelize.DATE,
        diagnosis: Sequelize.STRING,
        treatment: Sequelize.STRING,
        prescription: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Medical_Records');
    }
  };
  