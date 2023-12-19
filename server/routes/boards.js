const express = require("express");
const router = express.Router();

// Import controllers
const {
    getAllBoards,
    getBoardPreviews,
    getBoard,
    createBoard,
    deleteBoard,
    updateBoard,
} = require("../controllers/boardController")

// API routes for Board Controller
router.get("/", getAllBoards); // get all boards
router.get("/previews", getBoardPreviews); // get board previews, TODO: have this work based on user id
router.get("/:id", getBoard); // get a single board
router.post("/", createBoard); // create a new board
router.delete("/:id", deleteBoard); // delete an existing board
router.patch("/:id", updateBoard); // update an existing board

module.exports = router;