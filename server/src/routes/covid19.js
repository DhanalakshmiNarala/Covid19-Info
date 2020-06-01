const express = require("express");
const router = express.Router();

const {
  getLastUpdatedDateOfCovid19Info,
  worldWideConfirmedCases,
  worldWideRecoveredCases,
  worldWideDiedCases,
  countryWiseConfirmedCases,
  countryWiseRecoveredCases,
  countryWiseDiedCases,
} = require("../controllers/covid19");

router.post("/lastUpdatedDate", getLastUpdatedDateOfCovid19Info);

router.post("/worldWideConfirmedCases", worldWideConfirmedCases);
router.post("/worldWideRecoveredCases", worldWideRecoveredCases);
router.post("/worldWideDiedCases", worldWideDiedCases);

router.post("/countryWiseConfirmedCases", countryWiseConfirmedCases);
router.post("/countryWiseRecoveredCases", countryWiseRecoveredCases);
router.post("/countryWiseDiedCases", countryWiseDiedCases);

module.exports = router;
