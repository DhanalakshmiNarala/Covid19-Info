const csvtojson = require("csvtojson");

const { successResponse, failureResponse } = require("../utils/response");
const { insertCovidInfoInDB } = require("../services/covidInfo");

const isAdmin = (req, res, next) => {
  if (!req.userInfo || !req.userInfo.isAdmin) {
    return failureResponse(res, {
      status: 403,
      message: "Admins can only upload files",
    });
  }
  next();
};

const handleUploadedFiles = async (req, res, next) => {
  try {
    await processInputFiles(req.files);
    return successResponse(res, {
      status: 200,
      message: "Files uploded successfully",
    });
  } catch (error) {
    console.log(error);
    return failureResponse(res, {
      status: 500,
      message: error.message,
    });
  }
};

const processInputFiles = async (files) => {
  const confirmedCasesInfo = await csvtojson().fromFile(files[0].path);
  const recoveredCasesInfo = await csvtojson().fromFile(files[1].path);
  const diedCasesInfo = await csvtojson().fromFile(files[2].path);

  let countryWiseCases = {};
  fillCovidCasesCount(confirmedCasesInfo, countryWiseCases, "confirmed");
  fillCovidCasesCount(diedCasesInfo, countryWiseCases, "deaths");
  fillCovidCasesCount(recoveredCasesInfo, countryWiseCases, "recovered");
  insertCountryWiseCasesInDB(countryWiseCases);
};

const fillCovidCasesCount = (casesInfo, countryWiseCases, caseType) => {
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d*$/;
  casesInfo.forEach((record) => {
    const country = record["Country/Region"];
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

const insertCountryWiseCasesInDB = (countryWiseCases) => {
  let lastUpdatedDateStr;
  const promises = Object.keys(countryWiseCases).map(async (country) => {
    const countryInfo = countryWiseCases[country];
    if (!lastUpdatedDateStr) {
      lastUpdatedDateStr = getLastUpdatedDate(Object.keys(countryInfo));
    }
    return insertCovidInfoInDB({
      country,
      date: lastUpdatedDateStr,
      ...countryInfo[lastUpdatedDateStr],
    });
  });
  return Promise.all(promises);
};

const getLastUpdatedDate = (dates) => {
  const lastUpdatedDate = new Date(
    Math.max.apply(
      null,
      dates.map((date) => new Date(date))
    )
  );
  return dates.find(
    (date) => new Date(date).getTime() === lastUpdatedDate.getTime()
  );
};

module.exports = { isAdmin, handleUploadedFiles };
