const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Billing = sequelize.define('Billing', {
      billing_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      appointment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Appointments',
          key: 'appointment_id'
        }
      },
      bookingId: { 
        type: DataTypes.INTEGER,
        references: {
          model: 'Booking',
          key: 'id' 
        }
      },
      amount_paid: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      invoice_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'Billing',
      timestamps: false
    });
  
    Billing.associate = function(models) {
      Billing.belongsTo(models.Appointments, { foreignKey: 'appointment_id' });
      // Billing.hasMany(models.Invoice, { foreignKey: 'billing_id' });
    };

    Billing.hasMany(require("./invoice"), { foreignKey: 'billing_id' });


module.exports = Billing;