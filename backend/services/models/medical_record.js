const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Medical_Record = sequelize.define("Medical_Record", {
  record_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',  // This references the Users table
      key: 'id',
    },
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',  // This references the Users table
      key: 'id',
    },
  },
  record_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  treatment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {});

module.exports = Medical_Record;
