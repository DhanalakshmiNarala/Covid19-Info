const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('covid-info', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recovered: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deaths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
