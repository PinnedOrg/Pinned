const express = require("express");
const router = express.Router();

const { preview, handleUploadError } = require('../helpers/fileHelper')

// Import controllers
const {
} = require("../controllers/imageController");

// API routes for Image Controller
router.get("/auth", ); // get all images
router.post("/upload")

module.exports = router;