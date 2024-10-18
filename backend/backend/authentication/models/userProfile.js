const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const User = require("./user");

// TODO: to add more fields according to the erd diagram
const UserProfile = sequelize.define("UserProfile", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
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
