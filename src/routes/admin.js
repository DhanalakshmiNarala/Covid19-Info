const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { uploadData } = require('../controllers/admin');
const { failureResponse } = require('../utils/response');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/data');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.csv') {
    return callback(new Error('Only .csv files are allowed'));
  }
  callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const isAdmin = (req, res, next) => {
  if (!req.userInfo || !req.userInfo.isAdmin) {
    return failureResponse(res, {
      status: 403,
      message: 'Admins can only upload files',
    });
  }
  next();
};

const uploadFiles = (req, res, next) => {
  upload.array('covidFiles', 4)(req, res, (error) => {
    if (req.fileValidationError) {
      return failureResponse(res, {
        status: 400,
        message: req.fileValidationError,
      });
    } else if (!req.files) {
      return failureResponse(res, {
        status: 400,
        message: 'Please upload files',
      });
    } else if (error) {
      return failureResponse(res, {
        status: 400,
        message: error && error.message,
      });
    }
    next();
  });
};

router.post('/uploadData', isAdmin, uploadFiles, uploadData);

module.exports = router;
