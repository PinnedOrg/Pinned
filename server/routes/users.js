const express = require("express");
const router = express.Router();
const { customRequireAuth  } = require('../helpers/authHelper');

const {
    createUser,
    userSignIn,
    userSignUp,
    subscribe,
    getAllUsers
  } = require("../controllers/userController");

router.post("/sign-in", userSignIn);
router.post("/sign-up", userSignUp);
router.post("/subscribe/:clubId", customRequireAuth, subscribe);
router.get("/", getAllUsers)

module.exports = router;