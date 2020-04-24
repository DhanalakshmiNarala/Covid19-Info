const { getCovidInfoFromDB } = require('../services/covidInfo');
const { successResponse, failureResponse } = require('../utils/response');

const worldWideConfirmedCases = async (req, res, next) => {
  try {
    const todayDate = new Date().getDate();
    const info = await getCovidInfoFromDB({ date: todayDate });
    const totalCases = info.reduce(
      (totalCases, record) => totalCases + record.confirmed_cases,
      0
    );

    return successResponse(res, {
      status: 200,
      message: 'World wide total confirmed cases',
      results: {
        worldWideConfirmedCases: totalCases,
      },
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

const worldWideRecoveredCases = async (req, res, next) => {
  try {
    const todayDate = new Date().getDate();
    const info = await getCovidInfoFromDB({ date: todayDate });
    const totalCases = info.reduce(
      (totalCases, record) => totalCases + record.recovered_cases,
      0
    );

    return successResponse(res, {
      status: 200,
      message: 'World wide total recovered cases',
      results: {
        worldWideRecoveredCases: totalCases,
      },
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

const worldWideDiedCases = async (req, res, next) => {
  try {
    const todayDate = new Date().getDate();
    const info = await getCovidInfoFromDB({ date: todayDate });
    const totalCases = info.reduce(
      (totalCases, record) => totalCases + record.died_cases,
      0
    );

    return successResponse(res, {
      status: 200,
      message: 'World wide total died cases',
      results: {
        worldWideDiedCases: totalCases,
      },
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

const countryWiseConfirmedCases = async (req, res, next) => {
  try {
    const todayDate = new Date().getDate();
    const info = await getCovidInfoFromDB({ date: todayDate });
    const countryWiseCount = info.map((record) => {
      return {
        country: record['countries_model.name'],
        count: record.confirmed_cases,
      }.sort((record1, record2) => {
        return record1.confirmed_cases - record2.confirmed_cases;
      });
    });

    return successResponse(res, {
      status: 200,
      message: 'Country wise confirmed cases',
      results: countryWiseCount,
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

const countryWiseRecoveredCases = async (req, res, next) => {
  try {
    const todayDate = new Date().getDate();
    const info = await getCovidInfoFromDB({ date: todayDate });
    const countryWiseCount = info.map((record) => {
      return {
        country: record['countries_model.name'],
        count: record.recovered_cases,
      }.sort((record1, record2) => {
        return record1.recovered_cases - record2.recovered_cases;
      });
    });
    return successResponse(res, {
      status: 200,
      message: 'Country wise recovered cases',
      results: countryWiseCount,
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

const countryWiseDiedCases = async (req, res, next) => {
  try {
    const todayDate = new Date().getDate();
    const info = await getCovidInfoFromDB({ date: todayDate });
    const countryWiseCount = info.map((record) => {
      return {
        country: record['countries_model.name'],
        count: record.died_cases,
      }.sort((record1, record2) => {
        return record1.died_cases - record2.died_cases;
      });
    });
    return successResponse(res, {
      status: 200,
      message: 'Country wise died cases',
      results: countryWiseCount,
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  worldWideConfirmedCases,
  worldWideRecoveredCases,
  worldWideDiedCases,
  countryWiseConfirmedCases,
  countryWiseRecoveredCases,
  countryWiseDiedCases,
};
