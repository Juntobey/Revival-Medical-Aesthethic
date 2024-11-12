const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

 const Invoice = sequelize.define('Invoice', {
      invoice_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      billing_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Billing',
          key: 'billing_id'
        }
      },
      invoice_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      amount_due: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      tableName: 'Invoice',
      timestamps: false
    });
  
    // Invoice.belongsTo(require("./billing"), { foreignKey: "billing_id" });

    module.exports = Invoice;
 