const express = require("express");
const router = express.Router();
const { preview, handleUploadError, customRequireAuth } = require('../helpers/fileHelper');

// Import controllers
const {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

// API routes for Event Controller
router.get("/", getEvents); // get all events
router.get("/:id", getEvent); // get a single event
router.post("/", customRequireAuth, preview.single('preview'), handleUploadError, createEvent); // create a new event
router.delete("/:id", customRequireAuth, deleteEvent); // delete an existing event
router.patch("/:id", customRequireAuth, updateEvent); // update an existing event

module.exports = router;