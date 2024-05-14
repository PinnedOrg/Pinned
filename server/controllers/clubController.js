const Club = require("../models/Club");
const Event = require("../models/Event")
const mongoose = require("mongoose");

const getClubPreviewsBasedOnFilters = async (req, res) => {
    // TODO: change to account for filters, add parameters to find({}). eg: find({ genre: "Music", cost: 0 })

    try {
        const clubPreviews = await Club
                                    .find()
                                    .select(" _id \
                                            name \
                                            overview \
                                            genre \
                                            lastActiveTerm \
                                            lastActiveYear \
                                            cost \
                                            email \
                                            instagram \
                                            facebook \
                                            youtube")
                                    .sort({ name: 1 });

        return res.status(200).json(clubPreviews);
    } catch (error) {
        console.error("Error retrieving club previews: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


const getClubDetails = async (req, res) => {
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

    return res.status(200).json(club);

    // get all of its events as well when opened
    // on a user dashclub or search, show other stuff
};

const createNewClub = async (req, res) => {
    try {
        const club = await Club.create({
            name: req.body.name,
            overview: req.body.overview,
            description: req.body.description,
            genre: req.body.genre,
            lastActiveTerm: req.body.lastActiveTerm,
            lastActiveYear: req.body.lastActiveYear,
            location: req.body.location,
            cost: req.body.cost,
            meetingsFrequency: req.body.meetingsFrequency,
            email: req.body.email,
            instagram: req.body.instagram,
            facebook: req.body.facebook,
            youtube: req.body.youtube,
            events: []
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
        const club = await Club.findByIdAndUpdate(id, {...req.body}, { new: true })

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
    getClubPreviewsBasedOnFilters,
    getClubDetails,
    createNewClub,
    deleteClub,
    updateClub,
}