const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const User = require("../../authentication/models/user");

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

Appointment.associate = (models) => {
  Appointment.belongsTo(models.Treatment, { foreignKey: 'treatment_id' });
};

Appointment.belongsTo(User, { foreignKey: "userId" });

module.exports = Appointment;
