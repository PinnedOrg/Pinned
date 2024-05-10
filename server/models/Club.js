const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Missing club name."], // requirement with custom error message
    },
    overview: { //short extract of the club
        type: String,
        required: [true, "Missing club overview."],
        maxLength: 200
    },
    description: {  //full description of the club
        type: String,
        required: [true, "Missing club description."]
    },
    genre: {
        type: String,
        required: [true, "Missing club genre."]
    },
    lastActiveTerm: {
        type: number, // five digits number: first 4 digits = year, last digit = term (O: Winter, 1: Spring, 2: Fall). eg. 20213
        required: true
    },
    location: {
        type: String,
        required: false
    },
    cost: {
        type: number,
        default: 0,
        min: 0
    },
    meetingsFrequency: { 
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    youtube: {
        type: String,
        required: false
    },
    events: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: "Event"
    },
    // publicStatus: {
    //     type: Boolean,
    //     required: true,
    //     default: true // public by default
    // },
    // owner: {
    //     type: String, //TODO: change to type username?
    //     required: true,
    //     default: "current user" // this should be filled in by default, in the future allow for ownership change
    // },
    // admins: {
    //     type: [String], //TODO: change to type user
    //     required: false
    // },
    // subscribers: {
    //     type: [String], //TODO: change to type user
    //     required: false
    // },
    //logo, TODO
    //bgImage, // bg image like a notion club
    //organization, 

  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;
