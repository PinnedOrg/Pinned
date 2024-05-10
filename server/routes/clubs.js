const express = require("express");
const router = express.Router();

// Import controllers
const {
    getAllClubs,
    getClubPreviews,
    getClub,
    createClub,
    deleteClub,
    updateClub,
} = require("../controllers/clubController")

// API routes for Club Controller
router.get("/", getAllClubs); // get all clubs
router.get("/previews", getClubPreviews); // get club previews, TODO: have this work based on user id
router.get("/:id", getClub); // get a single club
router.post("/", createClub); // create a new club
router.delete("/:id", deleteClub); // delete an existing club
router.patch("/:id", updateClub); // update an existing club

module.exports = router;