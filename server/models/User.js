const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
