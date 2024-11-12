// models/schedule.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const TimeSlot = require("./timeslot");
const User = require("../../authentication/models/user");

const Schedule = sequelize.define("Schedule", {
  doctor_id: { // Link schedule to the doctor (user with role_id 3)
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: { // Store the date in a proper format
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  is_available: { // Availability flag (whether the doctor is available)
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  note: { // Notes for the availability (e.g., "Away", "Fully booked")
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Schedule.hasMany(TimeSlot, { foreignKey: "schedule_id", onDelete: "CASCADE" });
TimeSlot.belongsTo(Schedule, { foreignKey: "schedule_id" });
// Schedule.belongsTo(User, { foreignKey: 'doctor_id' });


module.exports = Schedule;
