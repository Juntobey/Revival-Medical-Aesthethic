const { DataTypes } = require("sequelize");
const User = require("./user");
const sequelize = require("../config/sequelize")

const UserProfile = sequelize.define("UserProfile", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emergencyContactName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emergencyContactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

// Establish one-to-one relationship
UserProfile.belongsTo(User, { foreignKey: "userId" });
User.hasOne(UserProfile, { foreignKey: "userId" });

module.exports = UserProfile;
