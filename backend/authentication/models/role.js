const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
// const sequelize = new Sequelize('sqlite::memory:');

const Role = sequelize.define("Roles", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Role;
