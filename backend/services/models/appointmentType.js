const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const AppointmentType = sequelize.define("AppointmentType", {
  appointmentType: {
    type: DataTypes.ENUM("hair", "transplant", "consultation", "follow up"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = AppointmentType;
