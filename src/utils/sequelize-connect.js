// const { resolve } = require('path');
// require('dotenv').config({ path: resolve(__dirname, '../../config/dev.env') });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_TYPE,
    define: { timestamps: false },
    logging: false,
  }
);

const User = UserModel(sequelize);

sequelize.sync({ force: true }).then(() => {
  console.log('Database tables created');
});
