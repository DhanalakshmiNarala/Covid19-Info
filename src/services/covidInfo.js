const sequelize = require("../utils/sequelize-connect");
const CovidInfoModel = require("../models/covid_info")(sequelize);
const CountriesModel = require("../models/countries")(sequelize);

const { insertCountryIntoDB } = require("./countries");

const insertCovidInfoInDB = async (params) => {
  const countryInfo = await insertCountryIntoDB(params.country);
  const info = {
    country_id: countryInfo.id,
    date: new Date(params.date),
    confirmed_cases: params.confirmed,
    died_cases: params.deaths,
    recovered_cases: params.recovered,
  };
  return CovidInfoModel.create(info, { raw: true });
};

const getCovidInfoFromDB = async (params) => {
  CovidInfoModel.belongsTo(CountriesModel, { foreignKey: "country_id" });
  return CovidInfoModel.findAll({
    raw: true,
    attributes: ["confirmed_cases", "died_cases", "recovered_cases"],
    where: params,
    include: [
      {
        model: CountriesModel,
        attributes: ["name"],
      },
    ],
  });
};

const getLastUpdatedDate = async () => {
  const lastUpdatedDate = await CovidInfoModel.findAll({
    attributes: [[sequelize.fn("max", sequelize.col("date")), "date"]],
    raw: true,
  });
  return lastUpdatedDate.length && lastUpdatedDate[0].date;
};

module.exports = {
  insertCovidInfoInDB,
  getCovidInfoFromDB,
  getLastUpdatedDate,
};
