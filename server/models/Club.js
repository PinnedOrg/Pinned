const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Missing club name."], // Requirement with custom error message
    },
    overview: { // Short extract of the club
        type: String,
        required: [true, "Missing club overview."],
        maxLength: 200
    },
    description: {  // Full description of the club
        type: String,
        required: [true, "Missing club description."]
    },
    genre: {
        type: String,
        required: [true, "Missing club genre."]
    },
    lastActiveTerm: {
        type: String, 
        enum: ['Winter', 'Spring', 'Fall'], // These are the only valid values
        required: [true, "Missing last active term."]
    },
    lastActiveYear: {
        type: Number,
        required: [true, "Missing last active year."],
        min: 2010,
        max: new Date().getFullYear() // current year
    },
    cost: {
        type: Number,
        required: [true, "Missing cost."],
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
