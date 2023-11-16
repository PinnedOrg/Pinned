const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    reuired: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: Number,
  },
  password: {
    type: String,
    reuired: true,
  },
  refreshToken: String
});

const User = mongoose.model("User", eventSchema);

module.exports = User;
