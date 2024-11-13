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
  targeted_user_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),  // Array of user IDs for targeted notifications
    allowNull: true, // Null indicates a global notification
  },
},{
  timestamps: false, // Disable timestamps
});

module.exports = Notification;
