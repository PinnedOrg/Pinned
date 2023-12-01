const Board = require("../models/Board");
const mongoose = require("mongoose");

// we will never been getting all boards at once
// only certain ones based on filter, or user owned/subscribed to

// const getCertainBoards(someFilter) //TODO

const getBoard = async (req, res) => {
    const { id } = req.params;

    // checks for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Board not found." });
    }


    const board = await Board.findById(id);

    // check if board exists
    if (!board) {
        return res.status(404).json({ error: "Board not found." });
    }

    res.status(200).json(board);
    // get all of its events as well when opened
    // on a user dashboard or search, show other stuff
}


//exporting all methods
module.exports = {
    getBoard,
}