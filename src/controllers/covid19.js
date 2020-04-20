const { getCovidInfoFromDB } = require('../services/covidInfo');
const { successResponse, failureResponse } = require('../utils/response');

const totalConfirmedCases = async (req, res, next) => {
  try {
    const todayDate = new Date().getDate();
    const info = await getCovidInfoFromDB({ date: todayDate });
    console.log(info);
    const totalCases = info.reduce(
      (totalCases, record) => totalCases + record.confirmed_cases,
      0
    );
    const countryWiseCount = info.map((record) => {
      return {
        country: record['countries_model.name'],
        count: record.confirmed_cases,
      };
    });
    return successResponse(res, {
      status: 200,
      message: 'Total confirmed cases',
      results: {
        totalWorldWideCase: totalCases,
        countryWiseCount,
      },
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

const totalRecoveredCases = async (req, res, next) => {
  try {
    const todayDate = new Date().getDate();
    const info = await getCovidInfoFromDB({ date: todayDate });
    const totalCases = info.reduce(
      (totalCases, record) => totalCases + record.recovered_cases,
      0
    );
    const countryWiseCount = info.map((record) => {
      return {
        country: record['countries_model.name'],
        count: record.recovered_cases,
      };
    });
    return successResponse(res, {
      status: 200,
      message: 'Total recovered cases',
      results: {
        totalWorldWideCase: totalCases,
        countryWiseCount,
      },
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

const totalDeaths = async (req, res, next) => {
  try {
    const todayDate = new Date().getDate();
    const info = await getCovidInfoFromDB({ date: todayDate });
    const totalCases = info.reduce(
      (totalCases, record) => totalCases + record.died_cases,
      0
    );
    const countryWiseCount = info.map((record) => {
      return {
        country: record['countries_model.name'],
        count: record.died_cases,
      };
    });
    return successResponse(res, {
      status: 200,
      message: 'Total death cases',
      results: {
        totalWorldWideCase: totalCases,
        countryWiseCount,
      },
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

module.exports = { totalConfirmedCases, totalRecoveredCases, totalDeaths };
