const Event = require("../models/Event");
const mongoose = require("mongoose");
const Board = require("../models/Board");
const { ObjectId } = require("mongodb");

// get all events
const getAllEvents = async (req, res) => {
  // fetchs all events and sorts results in descending order
  const events = await Event.find({}).sort({ createdAt: -1 }); //find is the criteria to search for (eg. title: "Event 1")

  res.status(200).json(events);
};

// get all the events associated with this board
const getBoardEvents = async (req, res) => {
  const { id } = req.params;

  // get the events property of the board object 
  try {
    const events = await Board.findById(id).then((board) => board.events)
    return res.status(200).json(events);
  } catch {
    return res.status(404).json({error: "Board not found."})
  }
    
  // get entire object
  //const events = await Event.aggregate([{ $match: { belongsToBoard: new mongoose.Types.ObjectId(id) }}]);
}

// get a single event
const getEvent = async (req, res) => {
  // fetchs a single event based on id
  const { id } = req.params;

  // if event id is invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found." });
  }

  const event = await Event.findById(id);

  // if event id does not exist
  if (!event) {
    return res.status(404).json({ error: "Event not found." });
  }

  res.status(200).json(event);
};

// create an event
const createEvent = async (req, res) => {
  const { title, description, contact, tags, date, time, location, preview, belongsToBoard } = req.body;

  // checks if the board id is valid
  if (!mongoose.Types.ObjectId.isValid(belongsToBoard)) {
    res.status(400).json({ error: error.message })
  }

  // add to database
  try {
    const event = await Event.create({
      title,
      description,
      contact,
      tags,
      date,
      time,
      location,
      preview,
      belongsToBoard,
    });
    res.status(201).json(event);
    
    // add event to board
    await Board.findByIdAndUpdate(belongsToBoard, { $push: { events: event._id } }, { new: true});
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an event
const deleteEvent = async (req, res) => {
  // fetchs a single event based on id
  const { id } = req.params;

  // if event id is invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found." });
  }

  // find the event and delete it by id
  const event = await Event.findByIdAndDelete(id);
  
  // if event id does not exist
  if (!event) {
    return res.status(400).json({ error: "Event not found." });
  }
  
  // remove the event from the board
  await Board.findByIdAndUpdate(event.belongsToBoard, { $pull: { events: event._id } }, { new: true})
  
  res.status(200).json(event);
};

// update an event
const updateEvent = async (req, res) => {
  // fetchs a single event based on id
  const { id } = req.params;

  // if event id is invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found." });
  }

  
  const event = await Event.findByIdAndUpdate(id, { ...req.body });

  // if event id does not exist
  if (!event) {
    return res.status(400).json({ error: "Event not found." });
  }

  if (req.body.belongsToBoard != null) {
    Board.findByIdAndUpdate(belongsToBoard, { $push: { events: event._id } }, { new: true});
  }

  res.status(200).json(event);
};

//TODO: fix patch for board change


// exporting all methods
module.exports = {
  getAllEvents,
  getBoardEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
