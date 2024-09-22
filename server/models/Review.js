const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        engagement: {
            type: Number,
            required: true,
            min: [0, "Engagement rating too low."],
            max: [5, "Engagement rating too high."],
        },
        flexibility: {
            type: Number,
            required: true,
            min: [0, "Flexibility rating too low."],
            max: [5, "Flexibility rating too high."],
        },
        inclusivity: {
            type: Number,
            required: true,
            min: [0, "Inclusivity rating too low."],
            max: [5, "Inclusivity rating too high."],
        },
        organization: {
            type: Number,
            required: true,
            min: [0, "Organization rating too low."],
            max: [5, "Organization rating too high."],
        },
        comment: {
            type: String,
            required: true,
            trim: true,
            maxlength: [500, "Comment too long."],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        club: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Club'
        }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;