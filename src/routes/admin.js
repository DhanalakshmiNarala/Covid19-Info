const express = require('express');
const router = express.Router();

router.post('/uploadData', (req, res, next) => {
  res.send('admin/uploadData working');
});

module.exports = router;
