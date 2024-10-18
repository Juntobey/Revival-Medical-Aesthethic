const sequelize = require("../config/sequelize")


// Sync models with database
const initializeDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("Database synchronized");
};

initializeDatabase();

