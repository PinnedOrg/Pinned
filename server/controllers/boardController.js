const Board = require("../models/Board");
const Event = require("../models/Event")
const mongoose = require("mongoose");

// get all boards
const getAllBoards = async (req, res) => {
  // fetchs all boards and sorts results in descending order
  const boards = await Board.find({}).sort({ createdAt: -1 }); //find is the criteria to search for (eg. title: "Board 1")

  res.status(200).json(boards);
}

const getBoardPreviews = async (req, res) => {

    // TODO: change the find criteria to be based on user name or id
    try {
        const boardPreviews = await Board.find().select("_id name publicStatus owner createdAt updatedAt").sort({ updatedAt: -1 });

        return res.status(200).json(boardPreviews);
    } catch (error) {
        console.error("Error retrieving board previews: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// get a single board
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
};

// create a board
const createBoard = async (req, res) => {
    const { name, about, publicStatus, owner, admins, subscribers, location, events } = req.body;

    // add new board to database
    try {
        const board = await Board.create({
            name, 
            about, 
            publicStatus, 
            owner, 
            admins, 
            subscribers, 
            location, 
            events
        });
        res.status(201).json(board);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a board
const deleteBoard = async (req, res) => {
    //fetchs a single board based on id
    const { id } = req.params;

    // if board id is invalid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Board not found." });
    }

    // find the board and delete it by id
    const board = await Board.findByIdAndDelete(id);

    // if board id does not exist
    if (!board) {
        return res.status(404).json({ error: "Board not found." });
    }

    // delete all events in the board
    await Event.deleteMany({ _id: { $in: board.events } })

    res.status(200).json(board);
};

// update a board

// updating admins, events, and subscribers will require seperate functions
const updateBoard = async (req, res) => {
    // fetchs a single board based on id
    const { id } = req.params;

    // if board id is invalid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Board not found." });
    }

    try {
        const board = await Board.findByIdAndUpdate(id, {...req.body}, { new: true, runValidators: true })

    // if board id does not exist
    if (!board) {
        return res.status(404).json({ error: "Board not found." });
    }

    res.status(200).json(board);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Handle validation error
            return res.status(400).json({ error: error.message });
          }
    }
};


//exporting all methods
module.exports = {
    getAllBoards,
    getBoardPreviews,
    getBoard,
    createBoard,
    deleteBoard,
    updateBoard,
}