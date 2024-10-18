const { DataTypes } = require("sequelize");
const Role = require("./role");
const sequelize = require("../../config/sequelize");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: "id",
    },
    defaultValue: 2,
  },
});

User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
