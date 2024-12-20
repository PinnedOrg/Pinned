const mongoose = require("mongoose");
const { ClubFeatureEnum } = require("../enums/ClubFeatureEnum");

const clubSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Missing club name."],
        // maxLength: 50
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    },
    description: {
        type: String,
        required: [true, "Missing club description."],
        // maxLength: 400,
        trim: true,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true
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
    validation: {
        type: Boolean,
        default: false
    },
    events: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: "Event"
    },
    apply_link: {
        type: String,
        required: false,
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please use a valid URL.'] // This is a regex pattern for URL, ensures valid URL
    },
    // facts: [
    //     {
    //         title: {
    //             type: String,
    //             required: true
    //         },
    //         description: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    faqs: {
        type: [
            {
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                }
            }
        ],
        required: false
    },
    owner: {
        type: String, // this is a clerk user_id (not the User_id from the model we have)
        required: [false, "Missing owner."],
    },
    subscribers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Review",
        required: false
    },
    featured: {
      type: Number, // 1 = Club of the week, 2 = Upcoming Club
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;
