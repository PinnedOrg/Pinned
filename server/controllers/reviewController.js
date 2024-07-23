const mongoose = require('mongoose');
const Review = require('../models/Review');
const Club = require('../models/Club');
const User = require('../models/User');

const addOrUpdateReview = async (req, res) => {
    const { rating, clubId } = req.query;
    const { userId } = req.auth

    try {
        let user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            return res.status(400).json({ error: "Invalid club id." });
        }

        let club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ error: "Club not found" });
        }
    
        let existingReview = await Review.findOneAndUpdate(
            { user: user._id, club: club._id },
            { rating },
            { runValidators: true, new: true });
        if (existingReview) {
            return res.status(202).json({ existingReview })
        }

        const review = await Review.create({ rating, user: user._id, club: clubId });

        console.log(review)
    
        // Add review to list of user reviews
        user.reviews.push(review._id);
        await user.save();
    
        // Add review to list of club reviews
        club.reviews.push(review._id);
        await club.save();
    
        return res.status(201).json({ review })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports =  {
    addOrUpdateReview,
}