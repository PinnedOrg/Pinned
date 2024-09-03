const express = require("express");
const router = express.Router();
const { customRequireAuth } = require('../helpers/authHelper');
const clubController = require("../controllers/clubController");

const {
    addOrUpdateReview,
    deleteReview
} = require("../controllers/reviewController");


router.put("/:clubId", customRequireAuth, addOrUpdateReview);
router.delete("/:reviewId", customRequireAuth, deleteReview);

module.exports = router;