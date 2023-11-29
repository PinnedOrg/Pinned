const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://dmruds123:Radius335841482@pinneddb.ulvjrsw.mongodb.net/?retryWrites=true&w=majority"
// );

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the Event Title"],
      maxLength: 30,
    },
    description: {
      type: String,
      required: false,
      maxLength: 200,
    },
    contact: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    date: {
      type: Date,
      required: [true, "Please enter the Event's Date"],
      default: Date.now,
    },
    time: {
      type: String,
      required: [true, "Please enter the Event's Time"],
    },
    location: {
      type: String,
      required: [true, "Please enter the Event's Loaction"],
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
