const mongoose = require("mongoose");
const Event = require("../models/Event");
const Club = require("../models/Club");

// get all events
const getAllEvents = async (req, res) => {
  // fetchs all events and sorts results in descending order
  const events = await Event.find({}).sort({ createdAt: -1 }); //find is the criteria to search for (eg. title: "Event 1")

  res.status(200).json(events);
};

// get all the events associated with this club
const getClubEventPreviews = async (req, res) => {
  const { id } = req.params;

  // if club id is invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Club not found." });
  }

  try {
    // Find the club based on the provided ID
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({ error: "Club not found." });
    }
    
    // Find the club based on the provided ID
    const events = await Event.find({ belongsToClub: id }).select("_id title description tags preview createdAt updatedAt").sort({ createdAt: -1 });

    return res.status(200).json(events);
  } catch (error) {
    console.error("Error retrieving club events: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  // get entire object
  //const events = await Event.aggregate([{ $match: { belongsToClub: new mongoose.Types.ObjectId(id) }}]);
};

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
  const {
    title,
    description,
    contact,
    tags,
    date,
    time,
    location,
    belongsToClub,
  } = req.body;

  // checks if the club id is valid
  if (!mongoose.Types.ObjectId.isValid(belongsToClub)) {return res.status(404).json({ error: "Club not found." });}
  const club = await Club.findById(belongsToClub);
  if (!club) {return res.status(404).json({ error: "Club not found." });}

  let event;
  // add to database
  try {
    const previewBuffer = req.file ? req.file.buffer.toString('base64') : null;
    const extension = req.file ? `image/${req.file.originalname.split('.').pop()}` : null;

    event = await Event.create({
      title,
      description,
      contact,
      tags,
      date,
      time,
      location,
      belongsToClub,
      preview: {
        data: previewBuffer,
        extension: extension
      }
    });
    
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // add event to club
  if (event) {await Club.findByIdAndUpdate(belongsToClub,{ $push: { events: event._id } },{ new: true });}
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
    return res.status(404).json({ error: "Event not found." });
  }

  // remove the event from the club
  await Club.findByIdAndUpdate(event.belongsToClub, { $pull: { events: event._id } }, { new: true });

  res.status(200).json(event);
};

// update an event
const updateEvent = async (req, res) => {
  // fetchs a single event based on id
  const { id, belongsToClub } = req.params;

  // if event id is invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found." });
  }

  try {
    const event = await Event.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });

    // if event id does not exist
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json(event);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation error
      return res.status(400).json({ error: error.message });
    }
  }
};

// exporting all methods
module.exports = {
  getAllEvents,
  getClubEventPreviews,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
