const express = require("express");
const router = express.Router();

// Import controllers
const {
    getClubPreviewsBasedOnFilters,
    getClubDetails,
    createNewClub,
    deleteClub,
    updateClub,
} = require("../controllers/clubController")

// API routes for Club Controller
router.get("/", getClubPreviewsBasedOnFilters); 
router.get("/:id", getClubDetails); 
router.post("/", createNewClub); 
router.delete("/:id", deleteClub);
router.patch("/:id", updateClub); 

module.exports = router;