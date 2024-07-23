const express = require("express");
const router = express.Router();
const { customRequireAuth } = require('../helpers/fileHelper');

// Import controllers
const {
    addOrUpdateReview
} = require("../controllers/reviewController");

// API routes for Event Controller
router.put("/", customRequireAuth, addOrUpdateReview);

module.exports = router;