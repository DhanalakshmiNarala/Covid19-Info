const express = require("express");
const router = express.Router();

const { isAdmin, handleUploadedFiles } = require("../controllers/admin");
const { uploadCovid19Files } = require("../utils/uploadFiles");

router.post("/uploadData", isAdmin, uploadCovid19Files, handleUploadedFiles);

module.exports = router;
