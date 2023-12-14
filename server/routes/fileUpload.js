const express = require("express");
const router = express.Router();

// Import controller
const {
    singleFileUpload,
    multipleFileUpload
} = require("../controllers/fileUploaderController");

const  { upload } = require('../helpers/fileHelper')

// API routes for File Uploads Controller
router.post("/singleFile", upload.single('file'), singleFileUpload); // create a new file upload
router.post("/multipleFiles", upload.array('files'), multipleFileUpload); // create a new multiple file upload

module.exports = router;