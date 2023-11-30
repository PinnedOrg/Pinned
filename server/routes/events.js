const express = require("express");
const router = express.Router();

// Import controllers
const {
  createEvent,
  getEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

// Import middlewares

// API routes for Event Controller
router.get("/", getAllEvents); // get all events
router.get("/:id", getEvent); // get a single event
router.post("/", createEvent); // create a new event
router.delete("/:id", deleteEvent); // delete an existing event
router.patch("/:id", updateEvent); // update an existing event

module.exports = router;
