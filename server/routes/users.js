const express = require("express");
const router = express.Router();

// Import controllers
const {
    createUser,
    subscribe
  } = require("../controllers/userController");

router.post("/register", createUser);
router.post("/subscribe", subscribe);


module.exports = router;