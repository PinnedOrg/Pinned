const mongoose = require("mongoose");
const Event = require("../models/Event");
const Club = require("../models/Club");

// get all events
const getEvents = async (req, res) => {
	// fetchs all events and sorts results in descending order
	const events = await Event.find({}).sort({ createdAt: -1 }); //find is the criteria to search for (eg. title: "Event 1")

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
	if (!mongoose.Types.ObjectId.isValid(belongsToClub)) {
		return res.status(404).json({ error: "Club not found." });
	}

	const club = await Club.findById(belongsToClub);

	if (!club) {
		return res.status(404).json({ error: "Club not found." });
	}

	if (club.owner !== req.user._id) {
		return res.status(401).json({ error: "Unauthorized." });
	}

	let event;

	try {
		const previewBuffer = req.file ? req.file.buffer.toString("base64") : null;
		const extension = req.file
			? `image/${req.file.originalname.split(".").pop()}`
			: null;

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
				extension: extension,
			},
		});

		res.status(201).json(event);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}

	// add event to club
	if (event) {
		await Club.findByIdAndUpdate(
			belongsToClub,
			{ $push: { events: event._id } },
			{ new: true }
		);
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

	const event = await Event.findById(id);

	// if event id does not exist
	if (!event) {
		return res.status(404).json({ error: "Event not found." });
	}

	const club = await Club.findById(event.belongsToClub);

	if (club.owner !== req.user._id) {
		return res.status(401).json({ error: "Unauthorized." });
	}

	// find the event and delete it by id
	await Event.findByIdAndDelete(id);

	// remove the event from the club
	await Club.findByIdAndUpdate(
		event.belongsToClub,
		{ $pull: { events: event._id } },
		{ new: true }
	);

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

	const event = await Event.findById(id);

	// if event id does not exist
	if (!event) {
		return res.status(404).json({ error: "Event not found." });
	}

	const club = await Club.findById(event.belongsToClub);

	if (club.owner !== req.user._id) {
		return res.status(401).json({ error: "Unauthorized." });
	}

	try {
		await Event.findByIdAndUpdate(
			id,
			{ ...req.body },
			{ new: true, runValidators: true }
		);

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
	getEvents,
	getEvent,
	createEvent,
	deleteEvent,
	updateEvent,
};
