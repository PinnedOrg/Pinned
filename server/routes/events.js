const express = require("express");
const router = express.Router();

const { preview, handleUploadError } = require('../helpers/fileHelper')

// Import controllers
const {
  getAllEvents,
  getBoardEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

// API routes for Event Controller
router.get("/", getAllEvents); // get all events
router.get("/of-board/:id", getBoardEvents); // get all events for a board based on its id
router.get("/:id", getEvent); // get a single event
router.post("/", preview.single('preview'), handleUploadError, createEvent); // create a new event
router.delete("/:id", deleteEvent); // delete an existing event
router.patch("/:id", updateEvent); // update an existing event

module.exports = router;