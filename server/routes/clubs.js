const express = require("express");
const router = express.Router();

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
router.post("/", createClub); 
router.delete("/:id", deleteClub);
router.patch("/:id", updateClub); 

module.exports = router;