const express = require("express");
const router = express.Router();
const { preview, handleUploadError } = require('../helpers/fileHelper')
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
router.post("/", preview.single('logo'), handleUploadError, createClub); 
router.delete("/:id", deleteClub);
router.patch("/:id", updateClub); 

module.exports = router;