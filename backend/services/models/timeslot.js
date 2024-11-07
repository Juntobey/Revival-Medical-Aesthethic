// models/TimeSlot.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const TimeSlot = sequelize.define("TimeSlot", {
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  schedule_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Schedules",
      key: "id",
    },
  },
});

module.exports = TimeSlot;
