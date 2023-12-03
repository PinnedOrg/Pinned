const Event = require("../models/Event");
const mongoose = require("mongoose");

// get all events
const getAllEvents = async (req, res) => {
  // fetchs all events and sorts results in descending order
  const events = await Event.find({}).sort({ createdAt: -1 });

  res.status(200).json(events);
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
  const { title, description, contact, tags, date, time, location, preview } =
    req.body;

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
    });
    res.status(201).json(event);
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
  const event = await Event.findOneAndDelete({ _id: id });

  // if event id does not exist
  if (!event) {
    return res.status(404).json({ error: "Event not found." });
  }

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

  await Event.findOneAndUpdate({ _id: id }, {...req.body,}, { runValidators: true }).catch((error) => {return res.status(400).json({ error: error.message });});

  const event = await Event.findById(id);

  // if event id does not exist
  if (!event) {
    return res.status(404).json({ error: "Event not found." });
  }

  res.status(200).json(event);
};

// exporting all methods
module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
