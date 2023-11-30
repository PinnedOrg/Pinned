const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the Event Title"], // requirement with custom error message
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
    contact: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: [true, "Please add at least one tag."], // requirement with custom error message
    },
    date: {
      type: Date, // type date handles both date and time, it might be redundant to include the time attribute
      required: [true, "Please enter the Event's Date"], // requirement with custom error message
      default: Date.now, // sets today's date by default to this attribute
    },
    time: {
      type: String,
      required: [true, "Please enter the Event's Time"], // requirement with custom error message
    },
    location: {
      type: String,
      required: [true, "Please enter the Event's Loaction"], // requirement with custom error message
    },
    preview: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
