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

const createClub = async (req, res) => {
    const {
    name,
    overview,
    description,
    genre,
    colorTheme,
    location,
    cost,
    meetingsFrequency,
    email,
    instagram,
    discord,
    facebook,
    } = req.body;

    const { userId } = req.auth;

    const existingClub = await Club.findOne({ owner: userId });
    if (existingClub) {
        return res.status(400).json({ error: 'Can not own more than 1 club.' });
    }

  let club;

  try {
    const logoBuffer = req.file ? req.file.buffer.toString('base64') : null;
    const extension = req.file ? `image/${req.file.originalname.split('.').pop()}` : null;

        club = await Club.create({
            name,
            overview,
            logo: {
            data: logoBuffer,
            extension: extension
            },
            description,
            genre,
            colorTheme,
            location,
            cost,
            meetingsFrequency,
            email,
            instagram,
            discord,
            facebook,
            owner: userId
        });

        res.status(201).json(club);
    } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteClub = async (req, res) => {
    const { id } = req.params;

    // if club id is invalid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Club not found." });
    }

    // find the club and delete it by id
    const club = await Club.findById(id);

    // if club id does not exist
    if (!club) {
        return res.status(404).json({ error: "Club not found." });
    }
    
    // if user is not the owner of the club
    if (club.owner !== req.auth.userId) {
        return res.status(403).json({ error: "Cannot delete a club you do not own." });
    }

    // Delete the club
    await club.deleteOne();

    // delete all events in the club
    await Event.deleteMany({ _id: { $in: club.events } })

    res.status(200).json(club);
};

const updateClub = async (req, res) => {
    const { id } = req.params;

    // if club id is invalid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Club not found." });
    }

    try {
        const club = await Club.findById(id)

        // if club id does not exist
        if (!club) {
            return res.status(404).json({ error: "Club not found." });
        }

        if (club.owner !== req.auth.userId) {
            return res.status(403).json({ error: "Cannot make changes to a club you do not own." });
        }

        Object.assign(club, req.body);
        await club.save();

    res.status(200).json(club);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Handle validation error
            return res.status(400).json({ error: error.message });
          }
    }
};

module.exports = {
    getClubPreviewsBasedOnFilters,
    getClubDetails,
    createClub,
    deleteClub,
    updateClub,
}