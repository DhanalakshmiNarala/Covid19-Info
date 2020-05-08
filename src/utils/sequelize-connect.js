const { resolve } = require("path");
require("dotenv").config({ path: resolve(__dirname, "../../config/dev.env") });

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_TYPE,
    define: { timestamps: false },
    logging: false,
    pool: {
      max: 95,
      min: 0,
      idle: 20000,
      acquire: 20000,
    },
  }
);

module.exports = sequelize;
