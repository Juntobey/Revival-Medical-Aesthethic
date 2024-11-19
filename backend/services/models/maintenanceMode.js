const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const MaintenanceMode = sequelize.define(
  "MaintenanceMode",
  {
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "maintenance_modes",
    underscored: true,
  }
);

module.exports = MaintenanceMode;
