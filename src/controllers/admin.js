const csvtojson = require('csvtojson');

const { successResponse, failureResponse } = require('../utils/response');
const { insertCovidInfoInDB } = require('../services/covidInfo');

const uploadData = async (req, res, next) => {
  try {
    if (!req.userInfo.isAdmin) {
      return failureResponse(res, {
        status: 403,
        message: 'Your not an Admin',
      });
    }
    const files = req.files;
    if (!files) {
      return failureResponse(res, {
        status: 400,
        message: 'Please upload files',
      });
    }
    await processInputFiles(files);
    return successResponse(res, {
      status: 200,
      message: 'files uploded successfully',
    });
  } catch (error) {
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

const processInputFiles = async (files) => {
  const confirmedCasesInfo = await csvtojson().fromFile(files[0].path);
  const deathCasesInfo = await csvtojson().fromFile(files[1].path);
  const recoveredCasesInfo = await csvtojson().fromFile(files[2].path);

  let countryWiseCases = {};
  fillCovidCasesCount(confirmedCasesInfo, countryWiseCases, 'confirmed');
  fillCovidCasesCount(deathCasesInfo, countryWiseCases, 'deaths');
  fillCovidCasesCount(recoveredCasesInfo, countryWiseCases, 'recovered');

  const promises = Object.keys(countryWiseCases).map(async (country) => {
    const countryInfo = countryWiseCases[country];
    return Promise.all(
      Object.keys(countryInfo).map(async (date) => {
        await insertCovidInfoInDB({
          country,
          date,
          ...countryInfo[date],
        });
      })
    );
  });
  return Promise.all(promises);
};

const fillCovidCasesCount = (casesInfo, countryWiseCases, caseType) => {
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d*$/;
  casesInfo.forEach((record) => {
    const country = record['Country/Region'];
    if (!countryWiseCases[country]) {
      countryWiseCases[country] = {};
    }

    Object.keys(record).forEach((key) => {
      if (key.match(dateRegex)) {
        const date = key;
        const count = parseInt(record[date]) || 0;

        if (!countryWiseCases[country][date]) {
          countryWiseCases[country][date] = {};
        }

        if (!countryWiseCases[country][date][caseType]) {
          countryWiseCases[country][date][caseType] = count;
        } else {
          countryWiseCases[country][date][caseType] += count;
        }
      }
    });
  });
};

module.exports = { uploadData };
