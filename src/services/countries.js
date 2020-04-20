const sequelize = require('../utils/sequelize-connect');
const CountriesModel = require('../models/countries')(sequelize);

const insertCountryIntoDB = async (countryName) => {
  const [countryInfo, isCreated] = await CountriesModel.findOrCreate({
    where: { name: countryName },
    defaults: { name: countryName },
    raw: true,
  });
  return countryInfo;
};

module.exports = { insertCountryIntoDB };
