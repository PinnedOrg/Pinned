const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://dmruds123:Radius335841482@pinneddb.ulvjrsw.mongodb.net/?retryWrites=true&w=majority"
// );

const eventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventContact: String,
  eventTags: [String],
  eventDate: Date,
  eventTime: String,
  eventLocation: String,
  eventPreview: String,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
