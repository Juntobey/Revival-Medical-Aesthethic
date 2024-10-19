// models/booking.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Booking = sequelize.define("Booking", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookingFor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bookingStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "confirmed",
  },
  contactNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Booking;
