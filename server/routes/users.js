const express = require("express");
const router = express.Router();
const { customRequireAuth  } = require('../helpers/fileHelper');

// Import controllers
const {
    createUser,
    subscribe
  } = require("../controllers/userController");

router.post("/register", createUser);
router.post("/subscribe/:clubId", customRequireAuth, subscribe);


module.exports = router;