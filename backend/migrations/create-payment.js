// migrations/XXXXXX-create-payment.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Payments', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        amount: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
        payment_method: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        paid_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        appointment_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Appointments',
            key: 'appointment_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Payments');
    },
  };
  