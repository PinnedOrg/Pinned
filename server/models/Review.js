const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        userId: {
            type: String,
            required: true,
        },
        clubId: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
