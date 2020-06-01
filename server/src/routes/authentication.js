const express = require('express');
const router = express.Router();

const {
  login,
  getNewAccessToken,
  logout,
} = require('../controllers/authentication');

router.post('/login', login);
router.post('/getNewAccessToken', getNewAccessToken);
router.delete('/logout', logout);

module.exports = router;
