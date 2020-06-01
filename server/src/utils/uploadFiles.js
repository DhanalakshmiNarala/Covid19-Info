const multer = require("multer");
const path = require("path");
const { failureResponse } = require("./response");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./src/data");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".csv") {
    return callback(new Error("Only .csv files are allowed"));
  }
  callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const uploadCovid19Files = (req, res, next) => {
  upload.array("covidFiles", 3)(req, res, (error) => {
    if (req.fileValidationError) {
      return failureResponse(res, {
        status: 400,
        message: req.fileValidationError,
      });
    } else if (!req.files) {
      return failureResponse(res, {
        status: 400,
        message: "Please upload files",
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

module.exports = { uploadCovid19Files };
