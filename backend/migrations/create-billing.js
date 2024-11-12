module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Billing', {
      billing_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      appointment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Appointments',
          key: 'appointment_id'
        }
      },
      bookingId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bookings',
          key: 'id'
        },
        allowNull: true,
      },
      amount_paid: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      invoice_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      payment_status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Billing');
  }
};
