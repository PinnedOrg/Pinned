const mongoose = require("mongoose");


const boardSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Missing board name"], // requirement with custom error message
        maxLength: [50, "Board name is too long"]
    },
    about: {
        type: String,
        required: [true, "Missing board description"]
    },
    publicStatus: {
        type: Boolean,
        required: true,
        default: true // public by default
    },
    owner: {
        type: String, //TODO: change to type username?
        required: true,
        default: "current user" // this should be filled in by default, in the future allow for ownership change
    },
    admins: {
        type: [String], //TODO: change to type username?
        required: false
    },
    subscribers: {
        type: [String], //TODO: change to type username?
        required: false
    },
    location: {
        type: String,
        required: false
    },
    events: {
        type: String, //TODO: change to event type
        required: false
    }
    //logo, TODO
    //bgImage, // bg image like a notion board
    //organization, 

  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
