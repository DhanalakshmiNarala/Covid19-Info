const sequelize = require('../utils/sequelize-connect');
const CovidInfoModel = require('../models/covid_info')(sequelize);
const { insertCountryIntoDB } = require('./countries');

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

module.exports = { insertCovidInfoInDB };
