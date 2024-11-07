module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Shifts', {
        shift_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        shift_type_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Shift_Types',
            key: 'shift_type_id'
          }
        },
        shift_description: Sequelize.STRING,
        supervisor: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        nurse: {
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
      await queryInterface.dropTable('Shifts');
    }
  };
  