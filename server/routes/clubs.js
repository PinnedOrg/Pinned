const express = require("express");
const router = express.Router();
const { preview, handleUploadError, customRequireAuth } = require('../helpers/fileHelper');

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
router.delete("/:id", customRequireAuth, deleteClub);
router.patch("/:id", customRequireAuth, updateClub); 

module.exports = router;