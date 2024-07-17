const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");

const Club = require("../models/Club");
const Event = require("../models/Event");

// might need to look at wrapping all functions with express async handler. Re, ChatTime

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
                                            genre \
                                            cost \
                                            size \
                                            logo \
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
}

// get all the events associated with this club
const getClubEvents = async (req, res) => {
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
		const events = await Event.find({ belongsToClub: id })
			.select("_id title description tags preview createdAt updatedAt")
			.sort({ createdAt: -1 });

		return res.status(200).json(events);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

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
        apply_link,
        facts,
    } = req.body;
    const { userId } = req.auth;
    // commented out for now until testing is done
    // const existingClub = await Club.findOne({ owner: userId });
    // if (existingClub) {
    //     return res.status(400).json({ error: 'Can not own more than 1 club.' });
    // }
    if (!name) {
        return res.status(400).json({ error: "Missing club name" });
    }
    const existingClub = await Club.findOne({ name: { $regex: name, $options: "i" } }); // case-insensitive search
    if (existingClub) {
        return res.status(400).json({ error: 'Club with that name already exists.' });
    }

    let image, encodedApiKey;
    if (req.file) {
        const logoBinary = req.file.buffer;
        const fileName = req.file.originalname;
        const folder = `${process.env.ENVIRONMENT === 'Production' ? 'Prod' : 'Dev'}/Clubs/${name}`;
        const tags = 'Logo'; // add additional tags separated by commas no space
        encodedApiKey = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString('base64') // colon after private key is required for imagekit

        // Create form data
        const formData = new FormData();
        formData.append('file', logoBinary, fileName);
        formData.append('fileName', fileName);
        formData.append('folder', folder);
        formData.append('tags', tags);

        // Upload to Imagekit
        await axios.post('https://upload.imagekit.io/api/v2/files/upload', formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Basic ${encodedApiKey}`,
            },
        }).then((res) => {
            image = res.data;
        }).catch((err) => {
            console.log(`Error (${err.status}) uploading to Imagekit: ${err.message}`)
            return res.status(500).json({ error: err.message });
        });
    }

    try {
        let club = await Club.create({
            name,
            overview,
            isActive: true,
            logo: {
                fileId: image.fileId,
                url: image.url
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
            apply_link,
            facts,
            owner: userId
        });
        res.status(201).json(club);
    } catch (error) {
        // Delete file if there was an error in the club creation
        if (req.file) {
            await axios.delete(`https://upload.imagekit.io/api/v1/files/${image?.fileId ?? ""}`, {
                headers: {
                    Authorization: `Basic ${encodedApiKey}`,
                },
            }).then(() => {
                console.log(`${image.fileId} deleted from ImageKit`)
            }).catch((err) => {
                console.log(`Unable to delete ${image.fileId} from ImageKit: ${err.message}`);
            });
        }
        res.status(400).json({ error: error.message });
    }
}

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
        return res.status(403).json({ error: "Can not delete a club you do not own." });
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
            return res.status(403).json({ error: "Can not update a club you do not own." });
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
	getClubEvents,
    createClub,
    deleteClub,
    updateClub,
}