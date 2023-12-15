const express = require("express");
const router = express.Router();

// Import controllers
const {
  getAllEvents,
  getBoardEventPreviews,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

// Import middlewares

// API routes for Event Controller
router.get("/", getAllEvents); // get all events
router.get("/of-board/:id", getBoardEventPreviews); // get all events for a board based on its id
router.get("/:id", getEvent); // get a single event
router.post("/", createEvent); // create a new event
router.delete("/:id", deleteEvent); // delete an existing event
router.patch("/:id", updateEvent); // update an existing event

module.exports = router;