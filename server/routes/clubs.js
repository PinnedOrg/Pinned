const express = require("express");
const router = express.Router();
const { preview, handleUploadError } = require('../helpers/fileHelper');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Use the ClerkExpressRequireAuth middleware to require authentication for a route
const customRequireAuth = (req, res, next) => {
    ClerkExpressRequireAuth()(req, res, (err) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized: Please sign-in." });
      }
      next();
    });
};

// Import controllers
const {
    getClubPreviewsBasedOnFilters,
    getClubDetails,
    createClub,
    deleteClub,
    updateClub,
} = require("../controllers/clubController")

// API routes for Club Controller
router.get("/", getClubPreviewsBasedOnFilters); 
router.get("/:id", getClubDetails); 
router.post("/", customRequireAuth, preview.single('logo'), handleUploadError, createClub); 
router.delete("/:id", deleteClub);
router.patch("/:id", updateClub); 

module.exports = router;