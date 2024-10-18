const sequelize = require("../config/config");
const User = require("./user");
const UserProfile = require("./userProfile");

// Sync models with database
const initializeDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("Database synchronized");
};

initializeDatabase();

module.exports = { User, UserProfile };
