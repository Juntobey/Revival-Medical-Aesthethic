const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("Appointments", {
      appointment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
        allowNull: false,
      },
      doctorId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
        allowNull: false,
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
        references: { model: "AppointmentTypes", key: "id" },
        allowNull: false,
      },
      bookingId: {
        type: DataTypes.INTEGER,
        references: { model: "Bookings", key: "id" },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Appointments");
  },
};
