const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('jwt_token', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    refresh_token: {
      type: DataTypes.CHAR(150),
      allowNull: false,
    },
  });
};
