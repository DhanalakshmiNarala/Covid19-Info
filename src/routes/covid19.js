const express = require('express');
const router = express.Router();

const {
  worldWideConfirmedCases,
  worldWideRecoveredCases,
  worldWideDiedCases,
  countryWiseConfirmedCases,
  countryWiseRecoveredCases,
  countryWiseDiedCases,
} = require('../controllers/covid19');

router.post('/worldWideConfirmedCases', worldWideConfirmedCases);
router.post('/worldWideRecoveredCases', worldWideRecoveredCases);
router.post('/worldWideDiedCases', worldWideDiedCases);

router.post('/countryWiseConfirmedCases', countryWiseConfirmedCases);
router.post('/countryWiseRecoveredCases', countryWiseRecoveredCases);
router.post('/countryWiseDiedCases', countryWiseDiedCases);

module.exports = router;
