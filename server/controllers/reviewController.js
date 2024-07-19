const mongoose = require('mongoose');
const Review = require('../models/Review');
// const Club = require('../models/Club');
const User = require('../models/User');

const addOrUpdateReview = async (req, res) => {
    const { rating, clubId } = req.body;
    const { userId } = req.auth

    console.log(userId, rating, clubId)

    // ensure user is signed in before proceeding (middleware)
    // check if user already has a review for that club, and update it
    // update the club list of reviews
    // create new review for user, add it to their list

    const user = await User.find({clerkId: userId});
    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }

    const existingReview = user.reviews.find(review => review.userId === userId)



    return res.status(200).json({})
}


module.exports =  {
    addOrUpdateReview,
}