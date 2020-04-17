const express = require('express');
const router = express.Router();

router.post('/totalConfirmedCases', (req, res, next) => {
  res.send('totalConfirmedCases working');
});

router.post('/totalRecoveredCases', (req, res, next) => {
  res.send('totalRecoveredCases working');
});

router.post('/totalDeaths', (req, res, next) => {
  res.send('totalDeaths working');
});

module.exports = router;
