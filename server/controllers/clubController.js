const Club = require("../models/Club");
const Event = require("../models/Event")
const mongoose = require("mongoose");

// get all clubs
const getAllClubs = async (req, res) => {
  // fetchs all clubs and sorts results in descending order
  const clubs = await Club.find({}).sort({ createdAt: -1 }); //find is the criteria to search for (eg. title: "Club 1")

  res.status(200).json(clubs);
}

const getClubPreviews = async (req, res) => {

    // TODO: change the find criteria to be based on user name or id
    try {
        const clubPreviews = await Club.find().select("_id name overview createdAt updatedAt").sort({ name: 1 });

        return res.status(200).json(clubPreviews);
    } catch (error) {
        console.error("Error retrieving club previews: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// get a single club
const getClub = async (req, res) => {
    const { id } = req.params;

    // checks for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Club not found." });
    }

    const club = await Club.findById(id);

    // check if club exists
    if (!club) {
        return res.status(404).json({ error: "Club not found." });
    }

    res.status(200).json(club);
    // get all of its events as well when opened
    // on a user dashclub or search, show other stuff
};

// create a club
const createClub = async (req, res) => {
    const { name, about, publicStatus, owner, admins, subscribers, location, events } = req.body;

    // add new club to database
    try {
        const club = await Club.create({
            name, 
            about, 
            publicStatus, 
            owner, 
            admins, 
            subscribers, 
            location, 
            events
        });
        res.status(201).json(club);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a club
const deleteClub = async (req, res) => {
    //fetchs a single club based on id
    const { id } = req.params;

    // if club id is invalid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Club not found." });
    }

    // find the club and delete it by id
    const club = await Club.findByIdAndDelete(id);

    // if club id does not exist
    if (!club) {
        return res.status(404).json({ error: "Club not found." });
    }

    // delete all events in the club
    await Event.deleteMany({ _id: { $in: club.events } })

    res.status(200).json(club);
};

// update a club

// updating admins, events, and subscribers will require seperate functions
const updateClub = async (req, res) => {
    // fetchs a single club based on id
    const { id } = req.params;

    // if club id is invalid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Club not found." });
    }

    try {
        const club = await Club.findByIdAndUpdate(id, {...req.body}, { new: true, runValidators: true })

    // if club id does not exist
    if (!club) {
        return res.status(404).json({ error: "Club not found." });
    }

    res.status(200).json(club);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Handle validation error
            return res.status(400).json({ error: error.message });
          }
    }
};


//exporting all methods
module.exports = {
    getAllClubs,
    getClubPreviews,
    getClub,
    createClub,
    deleteClub,
    updateClub,
}