// sequelize.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// when we defining a connection to postgres database for production
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });




module.exports = sequelize;
