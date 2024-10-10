const mongoose = require("mongoose");

const Club = require("../models/Club");
const Event = require("../models/Event");
const Image = require("../models/Image");
const {uploadToImageKit, deleteFromImageKit} = require("../helpers/imagekitUploader");

// might need to look at wrapping all functions with express async handler. Re, ChatTime

const getClubPreviewsBasedOnFilters = async (req, res) => {
    const { name, genre, cost, size, showInactive, rating, featured } = req.query;

    // ensure that the filters parameters are not undefined or null before adding them to the filters object
    let filters = {
        validation: true
    };

    if (featured) {
        filters.featured = {$gt: 0}; // non zero values are featured
    } else {
        if (genre) filters.genre = { $regex: genre, $options: "i" };
        if (cost >= 0) filters.cost = {$lte: cost};
        if (size >= 0) filters.size = {$lte: size};
        if (showInactive === "false") {
            filters.isActive = true; // only filter for active clubs
        }

         // searches for name to match searched name, "i" = case insensitive
         const searchedName = name ? {
            $or: [
                { name: { $regex: name, $options: "i" } },
                // add parameters fields to search for here
            ]
        } : {};

        filters = { ...searchedName, ...filters };
    }

    try {
        let clubPreviewsList = await Club
            .find(filters)
            .select("   _id \
                        name \
                        genre \
                        cost \
                        size \
                        description \
                        isActive \
                        colorTheme \
                        featured")  // only select these fields to return
            .populate("logo")
            .populate("reviews")
            .sort({ name: 1 });

        //compute average rating for each club
        clubPreviewsList = clubPreviewsList.map(club => {
            let c = club.toObject();
            let avgRating = 0;
            if (c.reviews?.length > 0) {
                c.reviews.forEach(review => {
                    const engagement = review.engagement || 0;
                    const flexibility = review.flexibility || 0;
                    const inclusivity = review.inclusivity || 0;
                    const organization = review.organization || 0;
                    avgRating += (engagement + flexibility + inclusivity + organization);
                });
                avgRating /= (c.reviews.length * 4); // each review has 4 ratings
            }
            return { ...c, avgRating };
        }).filter(club => club.avgRating >= (rating || 0));

        return res.status(200).json(clubPreviewsList);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const getClubDetails = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Club not found." });
    }

    const club = await Club.findById(id)
        .populate('logo')
        .populate({
            path: 'reviews',
            options: { sort: { updatedAt: -1 } },
            populate: {
                path: 'user',
                model: 'User'
            }
        })
        .populate('events')
        .populate('subscribers');

    if (!club) {
        return res.status(404).json({ error: "Club not found." });
    }

    return res.status(200).json(club);
};

// Not needed since we get this data from fetching the club itself
// const getClubEvents = async (req, res) => {
// 	const { id } = req.params;
//
// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ error: "Club not found." });
// 	}
//
// 	try {
// 		const club = await Club.findById(id);
//
// 		if (!club) {
// 			return res.status(404).json({ error: "Club not found." });
// 		}
//
// 		const events = await Event.find({ belongsToClub: id })
// 			.select("_id title description tags preview createdAt updatedAt")
// 			.sort({ createdAt: -1 });
//
// 		return res.status(200).json(events);
// 	} catch (error) {
// 		return res.status(500).json({ error: error.message });
// 	}
// }

const createClub = async (req, res) => {
    const {
        name,
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
    const existingClub = await Club.findOne({ owner: userId });
    if (existingClub && process.env.ENVIRONMENT === 'Production') {
        return res.status(400).json({ error: 'Can not own more than 1 club.' });
    }
    if (!name) {
        return res.status(400).json({ error: "Missing club name" });
    }
    const existingClubWithSameName = await Club.findOne({ name: { $regex: name, $options: "i" } }); // case-insensitive search
    if (existingClubWithSameName) {
        return res.status(400).json({ error: 'Club with that name already exists.' });
    }

    let image;
    if (req.file) {
        const response = await uploadToImageKit(
            req.file.buffer,
            req.file.originalname,
            `/Clubs/${name}`,
            ['Logo']);

        console.log(response)

        // Image upload error
        if (response.error) {
            return res.status(400).json({ error: response.error });
        }

        image = response.data;
    }

    try {
        const logo = image ? await Image.create({
            fileId: image.fileId,
            url: image.url
        }) : null

        let club = await Club.create({
            name,
            isActive: true,
            logo,
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
            await deleteFromImageKit(image.fileId);
        }
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
}

const deleteClub = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Club not found." });
    }

    const club = await Club.findById(id);

    if (!club) {
        return res.status(404).json({ error: "Club not found." });
    }
    
    if (club.owner !== req.auth.userId) {
        return res.status(403).json({ error: "Can not delete a club you do not own." });
    }

    //TODO: delete all images from imagekit
    await club.deleteOne();

    //TODO: this should also delete the event images from imagekit
    await Event.deleteMany({ _id: { $in: club.events } })

    res.status(200).json(club);
};

const updateClub = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Club not found." });
    }

    try {
        const club = await Club.findById(id)

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
        return res.status(400).json({ error: error.message });
    }
};

// const addFieldToAllEntries = async (req, res) => {
//     const { field, value } = req.body;

//     if (!field) {
//         return res.status(400).json({ error: "Field is required" });
//     }

//     try {
//         await Club.updateMany({}, { [field]: value });

//         res.status(200).json({ message: `Added ${field} to all entries` });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// const removeFieldFromAllEntries = async (req, res) => {
//     const { field } = req.body;

//     try {
//         await Club.updateMany({}, { $unset: { [field]: "" } });

//         res.status(200).json({ message: `Removed ${field} from all entries` });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// only need to be ran once to update genres. Already ran. But kept the script in case we need to move to new db



module.exports = {
    getClubPreviewsBasedOnFilters,
    getClubDetails,
	// getClubEvents,
    createClub,
    deleteClub,
    updateClub
}
