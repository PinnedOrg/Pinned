const express = require("express");
const router = express.Router();
const { preview, handleUploadError, customRequireAuth } = require('../helpers/fileHelper');


// Import controllers
const {
    getClubPreviewsBasedOnFilters,
    getClubDetails,
    getClubEvents,
    createClub,
    deleteClub,
    updateClub,
} = require("../controllers/clubController")

// API routes for Club Controller
router.get("/", getClubPreviewsBasedOnFilters); 
router.get("/:id", getClubDetails); 
router.get("/events/:id", getClubEvents); // get all events for a club based on its id
router.post("/", customRequireAuth, preview.single('logo'), handleUploadError, createClub); 
router.delete("/:id", customRequireAuth, deleteClub);
router.patch("/:id", customRequireAuth, updateClub); 

module.exports = router;