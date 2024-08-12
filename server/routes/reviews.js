const express = require("express");
const router = express.Router();
const { customRequireAuth } = require('../helpers/authHelper');

// Import controllers
const {
    addOrUpdateReview,
    deleteReview
} = require("../controllers/reviewController");

// API routes for Event Controller
router.put("/:clubId", customRequireAuth, addOrUpdateReview);
router.delete("/:reviewId", customRequireAuth, deleteReview);

module.exports = router;