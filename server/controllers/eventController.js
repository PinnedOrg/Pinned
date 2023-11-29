const Event = require("../models/Event")

// get all events
const getEvents = async (req, res) => {
  // fetchs all events and sorts results in descending order
  const events = await Event.find({}).sort({ createdAt: -1 })

  res.status(200).json(events)
};

// get a single event
const getEvent = async (req, res) => {
  // fetchs a single event based on id
  const { id } = req.params
  const event = await Event.findById(id)

  if (!event) {
    return res.status(404).json({error: "Event not found."})
  } 
  
  res.status(200).json(event)
};

// create an event
const createEvent = async (req, res) => {
  const { title, description, contact, tags, date, time, location, preview } =
    req.body

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

// update an event

// exporting methods
module.exports = {
  createEvent,
  getEvents,
  getEvent
};
