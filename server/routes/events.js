const express = require("express");
const router = express.Router();

// Import controllers
const {
    createEvent,
    getEvent,
    getEvents
} = require("../controllers/eventController")

// Import middlewares

// API routes for Event Controller
router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", createEvent);

module.exports = router;