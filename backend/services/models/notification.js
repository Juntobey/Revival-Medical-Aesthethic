const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Notification = sequelize.define("Notification", {
  notifications_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Associations
Notification.associate = function (models) {
  Notification.belongsTo(models.User, { foreignKey: "created_by" });
};

module.exports = Notification;
