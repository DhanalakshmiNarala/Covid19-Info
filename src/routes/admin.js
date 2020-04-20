const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadData } = require('../controllers/admin');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/data');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/uploadData', upload.array('covidFiles', 4), uploadData);

module.exports = router;
