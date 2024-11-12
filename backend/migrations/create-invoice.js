 module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Invoice', {
        invoice_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        billing_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Billing',
            key: 'billing_id'
          }
        },
        invoice_date: {
          type: Sequelize.DATE,
          allowNull: false
        },
        amount_due: {
          type: Sequelize.FLOAT,
          allowNull: false
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Invoice');
    }
  };