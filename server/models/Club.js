const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Missing club name."], // Requirement with custom error message
    },
    logo: {
        type: Buffer,
        extension: String,
        required: false,
    },
    overview: { // Short extract of the club
        type: String,
        required: [true, "Missing club overview."],
        maxLength: 100,
        trim: true, 
    },
    description: {  // Full description of the club
        type: String,
        required: [true, "Missing club description."],
        maxLength: 2500,
        trim: true,
    },
    genre: {
        type: String,
        required: [true, "Missing club genre."]
    },
    colorTheme: {
        type: String,
        required: false,
        default: "#ffffff"
    },
    cost: {
        type: Number,
        required: [true, "Missing cost."],
        default: 0,
        min: 0
    },
    size: {
        type: Number,
        required: [true, "Missing size."],
        default: 0,
        min: 0
    },
    location: {
        type: String,
        required: false,
        trim: true // This will remove leading and trailing whitespace
    },
    meetingsFrequency: { 
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: false,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] // This is a regex pattern for email, ensures valid email
    },
    instagram: {
        type: String,
        required: false,
        trim: true
    },
    discord: {
        type: String,
        required: false,
        trim: true
    },
    facebook: {
        type: String,
        required: false,
        trim: true
    },
    events: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: "Event"
    },
    // admins: {
    //     type: [String], //TODO: change to type user
    //     required: false
    // },
    // subscribers: {
    //     type: [String], //TODO: change to type user
    //     required: false
    // },
    //bgImage, // bg image like a notion club
    //organization, 

  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;
