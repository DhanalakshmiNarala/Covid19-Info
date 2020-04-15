const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('countries', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      unique: 'unique_country_name',
    },
  });
};
