const mongoose = require('mongoose');
const Review = require('../models/Review');
const Club = require('../models/Club');
const User = require('../models/User');
const { checkForProfanity } = require("../helpers/textFilters");

const addOrUpdateReview = async (req, res) => {
    // console.log(req.body);
    const { engagement, commitment, inclusivity, organization, comment } = req.body;
    const { clubId } = req.params;
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

        if (checkForProfanity(comment)) {
            return res.status(400).json({ error: "Comment contains profanity" });
        }
    
        let existingReview = await Review.findOneAndUpdate(
            { user: user._id, club: club._id },
            { engagement, commitment, inclusivity, organization, comment },
            { runValidators: true, new: true });
        if (existingReview) {
            return res.status(202).json({ review: existingReview })
        }

        const review = await Review.create({ 
            engagement, 
            commitment,
            inclusivity, 
            organization,
            comment,
            user: user._id, 
            club: clubId });
    
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

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const { userId } = req.auth

    try {
        let user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ error: "Invalid review id." });
        }

        let review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        if (review.user !== user._id) {
            return res.status(403).json({ error: "You are not authorized to delete this review." });
        }

        await Review.findByIdAndDelete(reviewId);

        // Remove review from list of user reviews
        user.reviews = user.reviews.filter(r => r._id !== reviewId);
        await user.save();

        // Remove review from list of club reviews
        let club = await Club.findById(review.club);
        club.reviews = club.reviews.filter(r => r._id !== reviewId);
        await club.save();

        return res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports =  {
    addOrUpdateReview,
    deleteReview
}