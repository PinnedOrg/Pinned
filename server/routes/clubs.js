const express = require("express");
const router = express.Router();
const { preview, handleUploadError } = require('../helpers/fileHelper');
const {  customRequireAuth, requireInternalAuth } = require('../helpers/authHelper');

// Import controllers
const {
    getClubPreviewsBasedOnFilters,
    getClubDetails,
    // getClubEvents,
    createClub,
    deleteClub,
    updateClub,
    // addFieldToAllEntries,
} = require("../controllers/clubController")

router.get("/", getClubPreviewsBasedOnFilters); 
router.get("/:id", getClubDetails);
// router.get("/events/:id", getClubEvents);
router.post("/", customRequireAuth, preview.single('logo'), handleUploadError, createClub); 
router.delete("/:id", customRequireAuth, deleteClub);
router.patch("/:id", customRequireAuth, updateClub); 
// router.patch("/add-field", requireInternalAuth, addFieldToAllEntries); // Internal use only

module.exports = router;