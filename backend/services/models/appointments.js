const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Appointment = sequelize.define("Appointment", {
  appointment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  doctorId: {
    type: DataTypes.INTEGER,
  },
  appointmentDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("scheduled", "canceled", "completed"),
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  appointmentTypeId: {
    type: DataTypes.INTEGER,
  },
  bookingId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Appointment;
