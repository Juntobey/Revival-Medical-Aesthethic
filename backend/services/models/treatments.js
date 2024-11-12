const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Treatment = sequelize.define('Treatment', {
  treatment_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Disable timestamps
});

Treatment.associate = (models) => {
  // Define any relationships if necessary
};

module.exports = Treatment;
