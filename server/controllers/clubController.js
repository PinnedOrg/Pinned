const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");

const Club = require("../models/Club");
const Event = require("../models/Event");
const Image = require("../models/Image");
const {uploadToImageKit, deleteFromImageKit} = require("../helpers/imagekitUploader");
const { parse } = require("path");

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
        if (genre) filters.genre = genre;
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
                    const commitment = review.commitment || 0;
                    const inclusivity = review.inclusivity || 0;
                    const organization = review.organization || 0;
                    avgRating += (engagement + commitment + inclusivity + organization);
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

const updateClubGenres = async () => {
    const clubGenres = {
        "A Cappella Club": "Arts",
        "ACE - A Cappella Affiliate": "Arts",
        "AIESEC": "Business & Entrepreneurship",
        "ASL Club": "Culture",
        "African Student Association (ASA)": "Culture",
        "AfroXDance Club": "Arts",
        "Animal Rights Society": "Politics & Social Awareness",
        "Animusic Ensembles": "Arts",
        "Armenian Students' Association": "Culture",
        "Ascend Canada Waterloo Chapter": "Business & Entrepreneurship",
        "Association of Caribbean Students": "Culture",
        "Aviation Society": "Academic",
        "Baseball Club": "Sports",
        "Beginner Baking Club": "Games & Social",
        "Big Spoon Lil Spoon": "Charity & Community Service",
        "Black Medical Leaders of Tomorrow": "Health & Well Being",
        "Breakers, UW": "Arts",
        "Buddha's Light Community Club, UW": "Religion & Spirituality",
        "Campus Association for Baháʼí Studies at UW (CABS)": "Religion & Spirituality",
        "Campus Compost, UW": "Environment & Sustainability",
        "Campus Crusade for Cheese": "Games & Social",
        "CariVybz Dance Company": "Arts",
        "Chess Club, UW": "Games & Social",
        "Chinese Christian Fellowship, UW": "Religion & Spirituality",
        "Chinese Hip-Hop (Rap) Club": "Arts",
        "Chinese Students Association (CSA), UW": "Culture",
        "Christian Orthodox Campus-Ministry Association": "Religion & Spirituality",
        "Christians on Campus": "Religion & Spirituality",
        "Club That Really Likes Anime (CTRL-A)": "Games & Social",
        "Concert Band, UW": "Arts",
        "Cooking Club, UW": "Games & Social",
        "Crafts 4 Charity": "Charity & Community Service",
        "Creative Writing Club": "Arts",
        "Creators Collective": "Arts",
        "CroWat: Croatian Student Association": "Culture",
        "Culture and Language Exchange Club, UW": "Culture",
        "DJ Club, UW": "Arts",
        "Debate Society, UW (Debating Association)": "Academic",
        "Deception Board Games Club": "Games & Social",
        "Engineers Without Borders": "Charity & Community Service",
        "Eritrean and Ethiopian Students Association": "Culture",
        "Euchre Club, UW": "Games & Social",
        "Fashion for Change": "Charity & Community Service",
        "Fighting Game Club (UWFGC)": "Games & Social",
        "Films, UW (Former Films Creator Club)": "Arts",
        "Finance Association (WIREX/Capital Markets), UW": "Business & Entrepreneurship",
        "Game Development Club": "Design Team",
        "Global Brigades - Business Brigades": "Charity & Community Service",
        "Gujarati Students Association (GSA)": "Culture",
        "HanVoice Waterloo": "Politics & Social Awareness",
        "Health Club": "Health & Well Being",
        "Her Campus Waterloo": "Media Literacy",
        "Hera.co": "Business & Entrepreneurship",
        "Hillel Waterloo": "Religion & Spirituality",
        "Hindu Students Council at the University of Waterloo": "Religion & Spirituality",
        "Hip Hop, UW": "Arts",
        "Humans vs. Zombies Society": "Games & Social",
        "Improv Club, UW": "Arts",
        "Indian Cultural Association, UW": "Culture",
        "Indonesian Students' Association": "Culture",
        "Iranian Students' Association of Waterloo": "Culture",
        "Jamnetwork": "Arts",
        "Kingdom Come": "Religion & Spirituality",
        "Korean Christian Fellowship": "Religion & Spirituality",
        "Latin American Student Association (LASA)": "Culture",
        "Law & Business Nexus (LBN)": "Business & Entrepreneurship",
        "Make-A-Wish UWaterloo Chapter": "Charity & Community Service",
        "Malaysian and Singaporean Association": "Culture",
        "Mambo Club": "Arts",
        "Mandarin Chinese Christian Fellowship": "Religion & Spirituality",
        "Marketing Association, UW": "Business & Entrepreneurship",
        "Metal KLVB, UW": "Arts",
        "MoMoSa": "Academic",
        "Mock Trial Club": "Academic",
        "Model United Nations, UW": "Politics & Social Awareness",
        "Musical Interdudes - A Cappella Affiliate": "Arts",
        "Muslim Students Association - Orphan Sponsorship Program": "Charity & Community Service",
        "Muslim Students' Association (MSA)": "Religion & Spirituality",
        "North African Student Association": "Culture",
        "One Step At A Time": "Charity & Community Service",
        "Pakistani Students' Association": "Culture",
        "Photography Club, UW": "Arts",
        "Pinned": "Sports",
        "Pokémon TCG Club": "Games & Social",
        "Power to Change (Campus Crusade for Christ)": "Religion & Spirituality",
        "Product Management Club": "Business & Entrepreneurship",
        "QTPOC KW": "Politics & Social Awareness",
        "Romanian Student Association": "Culture",
        "Rubik's Cube Club (formerly twisty puzzles), UW": "Games & Social",
        "SMILE (Students for Mental health and Inner Life Enrichment)": "Health & Well Being",
        "Serbian Student Association": "Culture",
        "Sikh Students Association (SSA)": "Religion & Spirituality",
        "Smash, UW": "Games & Social",
        "Socialist Fightback Club at Waterloo University": "Politics & Social Awareness",
        "Stand-up Club": "Arts",
        "Stocks Club": "Business & Entrepreneurship",
        "Students Supporting Opioid Stewardship (S.S.O.S.)": "Health & Well Being",
        "Sunshine Cheerful Crawling Club (SCCC)": "Health & Well Being",
        "TMA (Thaqalayn Muslim Association)": "Religion & Spirituality",
        "Taylor Swift Society (est. 1989)": "Arts",
        "Tea and Culture Club": "Culture",
        "Teaching Students' Association": "Academic",
        "Tech+ UW": "Business & Entrepreneurship",
        "Technology in Pharmacy Network": "Academic",
        "Telugu Student Association": "Culture",
        "The AcaBellas - A Cappella Affiliate": "Arts",
        "The Bhakti Yoga Club": "Religion & Spirituality",
        "The Circle K International Club of University of Waterloo": "Charity & Community Service",
        "The Islamic Information Center of the University Waterloo (IICUW)": "Religion & Spirituality",
        "The Unaccompanied Minors - A Cappella Affiliate": "Arts",
        "The Water Boys - A Cappella Affiliate": "Arts",
        "The Women's Network (TWN)": "Business & Entrepreneurship",
        "Turkish Students Association": "Culture",
        "UW ACE Chapter": "Business & Entrepreneurship",
        "UW Blockchain Club": "Business & Entrepreneurship",
        "UW Board Games Club": "Games & Social",
        "UW Book Club": "Games & Social",
        "UW Cancer Foundation": "Charity & Community Service",
        "UW Charity Knitting Circle": "Charity & Community Service",
        "UW Chinese Instrumental Orchestra": "Arts",
        "UW Cuban Salsa Club": "Arts",
        "UW Cyber Security": "Academic",
        "UW Dhamaka": "Arts",
        "UW Entrepreneurship Society": "Business & Entrepreneurship",
        "UW Go Club": "Games & Social",
        "UW Kpop Club": "Arts",
        "UW Management Consulting Club": "Business & Entrepreneurship",
        "UW Mario Kart": "Games & Social",
        "UW Mehfil": "Arts",
        "UW Neurodivergent Community": "Health & Well Being",
        "UW Operation Smile": "Charity & Community Service",
        "UW Parks Canada Club": "Environment & Sustainability",
        "UW Period Purse": "Charity & Community Service",
        "UW Poker Studies Club": "Games & Social",
        "UW Pre-Dental Club": "Academic",
        "UW Pre-Med Club": "Academic",
        "UW Quizbowl": "Games & Social",
        "UW SafeTails Initiative": "Charity & Community Service",
        "UW Scrabble": "Games & Social",
        "UW Stem Cell Club (Formerly UW One Match)": "Charity & Community Service",
        "UW Street Dance": "Arts",
        "UW Supporting SickKids": "Charity & Community Service",
        "UW Tetris Club": "Games & Social",
        "UW VR": "Design Team",
        "UWVSA (University of Waterloo Vietnamese Student Association)": "Culture",
        "UWaterloo Chai and Verse": "Arts",
        "UWaterloo Meditates": "Health & Well Being",
        "United for Literacy – University of Waterloo": "Charity & Community Service",
        "Universal Finance Organization, UW": "Business & Entrepreneurship",
        "University of Waterloo Bhangra": "Arts",
        "University of Waterloo Canadian Association on Gerontology Student Connection (UWCAG)": "Academic",
        "University of Waterloo Cantonese Chinese Christian Fellowship": "Religion & Spirituality",
        "University of Waterloo Conservatives": "Politics & Social Awareness",
        "University of Waterloo Entomology Club": "Academic",
        "University of Waterloo Filipino Students' Association": "Culture",
        "University of Waterloo Global Dental Brigades (UW GDB)": "Charity & Community Service",
        "University of Waterloo Korean Students’ Association": "Culture",
        "University of Waterloo Malayalee Association": "Culture",
        "University of Waterloo Moot Court": "Academic",
        "University of Waterloo New Democratic Party": "Politics & Social Awareness",
        "University of Waterloo Zoology Club": "Academic",
        "University of Waterloo's Beauty Club (UWBC)": "Health & Well Being",
        "Visual Arts Club, UW": "Arts",
        "Waterloo Arab Student Association": "Culture",
        "Waterloo Hockey Club": "Sports",
        "Waterloo Ismaili Students' Association": "Religion & Spirituality",
        "Waterloo Movie Watchers Club": "Games & Social",
        "Waterloo Punjabi Association (WPA)": "Culture",
        "Waterloo Real Estate Association": "Business & Entrepreneurship",
        "Waterloo Science Fiction & Fantasy Club (WATSFIC)": "Games & Social",
        "Waterloo Students and Microbiology (WatSAM)": "Academic",
        "Waterloo Zine Club": "Arts",
        "Women in Science, Technology, Engineering, and Mathematics (WiSTEM)": "Academic",
        "Youth Alive Fellowship": "Religion & Spirituality",
        "Yugioh Club": "Games & Social",
        "hazem's test club": "Academic",
        "osu! Club, UW": "Games & Social"      
    };

    try {
        const updatePromises = Object.entries(clubGenres).map(([clubName, genre]) => {
            return Club.updateMany(
                { name: clubName },
                { $set: { genre: genre } }
            );
        });

        const updateResults = await Promise.all(updatePromises);
        
        const modifiedCount = updateResults.reduce((sum, result) => sum + result.modifiedCount, 0);
        console.log("yooo")
    } catch (error) {
        console.log("whatt");
    }
};


module.exports = {
    getClubPreviewsBasedOnFilters,
    getClubDetails,
	// getClubEvents,
    createClub,
    deleteClub,
    updateClub,
    updateClubGenres
}

// updateClubGenres();
