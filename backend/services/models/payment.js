// models/payment.js
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paid_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    Payment.associate = (models) => {
      Payment.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
    };
  
    return Payment;
  };
  