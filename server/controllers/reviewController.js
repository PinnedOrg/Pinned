const mongoose = require('mongoose');
const Review = require('../models/Review');
// const Club = require('../models/Club');
const User = require('../models/User');

const addOrUpdateReview = async (req, res) => {
    const { rating, clubId } = req.body;
    const { userId } = req.auth

    try {
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ error: "Club not found" });
        }
    
        const existingReview = await Review.findOne({ user: user._id, club: club._id })
        if (existingReview) {
            existingReview.rating = rating;
            await existingReview.save();
            return res.status(202).json({ existingReview })
        }
    
        const review = await Review.create({ rating, userId, clubId });
    
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