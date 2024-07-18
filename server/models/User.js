const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        required: false,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] // This is a regex pattern for email, ensures valid email
    },
    clerk_id: {
      type: String,
      required: true,
      unique: true
    },
    clubs: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: "Club"
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
