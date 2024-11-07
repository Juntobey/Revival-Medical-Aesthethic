module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Shift_Types', {
        shift_type_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        shift_type: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Shift_Types');
    }
  };
  