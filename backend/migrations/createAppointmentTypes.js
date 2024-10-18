const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("AppointmentTypes", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      appointmentType: {
        type: DataTypes.ENUM("hair", "transplant", "consultation", "follow up"),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
    await queryInterface.dropTable("AppointmentTypes");
  },
};
