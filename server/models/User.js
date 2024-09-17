const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true
    },
    clubs: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: "Club"
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: "Review"
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
