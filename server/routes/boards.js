const express = require("express");
const router = express.Router();

// Import controllers
const {
    getBoard,
    createBoard,
    deleteBoard,
    updateBoard,
    getAllBoards
} = require("../controllers/boardController")

// Import middlewares


// API routes for Board Controller
router.get("/", getAllBoards)
router.get("/:id", getBoard); // get a single board
router.post("/", createBoard); // create a new board
router.delete("/:id", deleteBoard); // delete an existing board
router.patch("/:id", updateBoard); // update an existing board

module.exports = router;