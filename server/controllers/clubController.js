const Club = require("../models/Club");
const Event = require("../models/Event")
const mongoose = require("mongoose");

// might need to look at warpping all functions with express async handler. Re, ChatTime

const getClubPreviewsBasedOnFilters = async (req, res) => {
    const { name, genre, cost, size } = req.query;

     // searches for either name or email to match searched name, "i" = case insensitive
     const searchedName = name ? {
        $or: [ 
            { name: { $regex: name, $options: "i" } },
            // add parameters fields to search for here
        ]
    } : {};

    // ensure that the filters parameters are not undefined or null before adding them to the filters object
    let filters = {};
    if (genre) filters.genre = genre;
    if (cost >= 0) filters.cost = {$lte: cost};
    if (size >= 0) filters.size = {$lte: size};

    try {
        const clubPreviewsList = await Club
                                    .find({ ...searchedName, ...filters, validation: true })
                                    .select(" _id \
                                            name \
                                            overview \
                                            logo \
                                            genre \
                                            cost \
                                            size \
                                            colorTheme")  // only select these fields to return
                                    .sort({ name: 1 });
                                    
        return res.status(200).json(clubPreviewsList);
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
        const logoBuffer = req.file ? req.file.buffer.toString('base64') : null;
        const extension = req.file ? `image/${req.file.originalname.split('.').pop()}` : null;

        const club = await Club.create({
            name: req.body.name,
            overview: req.body.overview,
            logo: {
                data: logoBuffer,
                extension: extension
            },
            description: req.body.description,
            genre: req.body.genre,
            colorTheme: req.body.colorTheme,
            location: req.body.location,
            cost: req.body.cost,
            meetingsFrequency: req.body.meetingsFrequency,
            email: req.body.email,
            instagram: req.body.instagram,
            discord: req.body.discord,
            facebook: req.body.facebook,
            youtube: req.body.youtube,
            events: []
        });
        res.status(201).json(club);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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