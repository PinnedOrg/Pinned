const mongoose = require('mongoose');
const Review = require('../models/review');
// const Club = require('../models/club');

const addOrUpdateReview = async (req, res) => {
    const { rating, clubId } = req.body;
    const { userId } = req.auth

    console.log(userId, rating, clubId)

    // ensure user is signed in before proceeding

    // check if user already has a review for that club, and update it
    // update the club list of reviews

    // create new review for user, add it to their list



    return res.status(200).json({})
}


module.exports =  {
    addOrUpdateReview,
}