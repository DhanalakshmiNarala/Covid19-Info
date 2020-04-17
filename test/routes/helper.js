const sequelize = require('../../src/utils/sequelize-connect');

const truncateTable = async (tableName) => {
  await sequelize.query(`truncate ${tableName} cascade`);
};

module.exports = { truncateTable };
