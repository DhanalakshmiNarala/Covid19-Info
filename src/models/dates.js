const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('dates', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: 'unique_date',
    },
  });
};
