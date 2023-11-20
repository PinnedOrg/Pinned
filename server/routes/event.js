const express = require("express");
const router = express.Router();

// Import controllers
const {getEvent} = require("../controllers/event")
// Import middlewares

// API routes
router.get("/event:id", getEvent);

module.exports = router;