const express = require('express');
const router = express.Router();

const {
  totalConfirmedCases,
  totalRecoveredCases,
  totalDeaths,
} = require('../controllers/covid19');

router.post('/totalConfirmedCases', totalConfirmedCases);

router.post('/totalRecoveredCases', totalRecoveredCases);

router.post('/totalDeaths', totalDeaths);

module.exports = router;
