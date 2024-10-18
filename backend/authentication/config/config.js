// config/config.js
const { Sequelize } = require("sequelize");

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  test: {
    dialect: 'sqlite',
    storage: './database.test.sqlite',
  },
  production: {
    dialect: 'sqlite',
    storage: './database.prod.sqlite',
  },
};
