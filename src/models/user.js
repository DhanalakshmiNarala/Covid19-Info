const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      alllowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.CHAR(15),
      alllowNull: false,
      unique: 'unique_user_name',
    },
    password: {
      type: DataTypes.CHAR(50),
      alllowNull: false,
    },
    name: {
      type: DataTypes.CHAR(50),
      alllowNull: false,
    },
    email: {
      type: DataTypes.CHAR(50),
      alllowNull: false,
      unique: 'unique_user_email',
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      alllowNull: false,
    },
  });
};
