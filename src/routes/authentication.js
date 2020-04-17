const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
  res.send('SignIn working');
});

router.post('/getNewAccessToken', (req, res, next) => {
  res.send('getNewAccessToken working');
});

router.delete('/logout', (req, res, next) => {
  res.send('Logout working');
});

module.exports = router;
