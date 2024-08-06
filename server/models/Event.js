const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Missing Event title."], // requirement with custom error message
      maxLength: [30, "Event title can not be longer than 30 characters."],
    },
    description: {
      type: String,
      required: false,
      maxLength: [
        200,
        "Event description can not be longer than 200 characters.",
      ],
    },
    // contact: {
    //   type: String,
    //   required: false,
    // },
    // tags: {
    //   type: [String], // TODO: Update seperate tags model
    //   required: [true, "Please add at least one tag."], // requirement with custom error message
    // },
    dateTime: {
      type: Date, // type date handles both date and time, it might be redundant to include the time attribute
      required: false
    },
    location: {
      type: String,
      required: false
    },
    image: { // adding 'required: false' breaks this as it has nested properties
      data: Buffer,
      extension: String
    },
    belongsToClub: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      immutable: [true, "Can not modify the club this event belongs to."],
      ref: "Club"
    },
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
