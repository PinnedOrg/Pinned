const express = require("express");
const router = express.Router();
const { customRequireAuth  } = require('../helpers/authHelper');

const {
    createUser,
    userSignIn,
    userSignUp,
    subscribe,
    getAllUsers,
    verifyEmailToken,
    requestVerificationEmail,
    userResetPassword
  } = require("../controllers/userController");

router.post("/sign-in", userSignIn);
router.post("/sign-up", userSignUp);
router.post("/verify-email", verifyEmailToken);
router.post("/send-verification-email", requestVerificationEmail);
router.post("/reset-password", userResetPassword);
router.post("/subscribe/:clubId", customRequireAuth, subscribe);
router.get("/", getAllUsers)

module.exports = router;