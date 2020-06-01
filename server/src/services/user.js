const bcrypt = require('bcrypt');

const sequelize = require('../utils/sequelize-connect');
const UsersModel = require('../models/users')(sequelize);

const insertUserInDB = async (params) => {
  params.password = await bcrypt.hash(params.password, 10);
  return UsersModel.create(params, { raw: true });
};

const getUserFromDB = async (params) => {
  return UsersModel.findOne({ where: params });
};

module.exports = { insertUserInDB, getUserFromDB };
