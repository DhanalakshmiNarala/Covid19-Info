const sequelize = require('../utils/sequelize-connect');
const CovidInfoModel = require('../models/covid_info')(sequelize);
const CountriesModel = require('../models/countries')(sequelize);

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

const getCovidInfoFromDB = async (params) => {
  CovidInfoModel.belongsTo(CountriesModel, { foreignKey: 'country_id' });
  return CovidInfoModel.findAll({
    raw: true,
    attributes: ['confirmed_cases', 'died_cases', 'recovered_cases'],
    where: params,
    include: [
      {
        model: CountriesModel,
        attributes: ['name'],
      },
    ],
  });

  // await CompanyEmployeesModel.belongsTo(EmployeeModel, {
  //   foreignKey: 'employee_id',
  // });
  // return await CompanyEmployeesModel.findAll({
  //   raw: true,
  //   attributes: [],
  //   where: { company_id: companyInfo.id },
  //   include: [
  //     {
  //       model: EmployeeModel,
  //       attributes: ['emp_id', 'name', 'email', 'address', 'phone_no'],
  //     },
  //   ],
  // });
};

module.exports = { insertCovidInfoInDB, getCovidInfoFromDB };
