// const { Pool } = require('pg');
// const dotenv = require('dotenv');

// dotenv.config();

// const pool = new Pool({
//     user:  process.env.POSTGRES_USER,
//     host: process.env.POSTGRES_HOST,
//     database: process.env.POSTGRES_DB,
//     password: process.env.POSTGRES_PASSWORD,
//     port: process.env.DB_PORT,
//     // Default port
// });

// console.log(pool)

// module.exports = pool;

// for local database
const { Sequelize } = require("sequelize");

// Initialize the SQLite connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

module.exports = sequelize;
