const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "country_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "countries_model"
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "date",
      autoIncrement: false
    },
    confirmed_cases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "confirmed_cases",
      autoIncrement: false
    },
    recovered_cases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "recovered_cases",
      autoIncrement: false
    },
    died_cases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "died_cases",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "covid_info",
    comment: "",
    indexes: []
  };
  const CovidInfoModel = sequelize.define("covid_info_model", attributes, options);
  return CovidInfoModel;
};