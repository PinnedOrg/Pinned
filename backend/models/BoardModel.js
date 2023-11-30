const mongoose = require("mongoose")

const Schema = mongoose.Schema

const boardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: { //this handles date and time
        type: Date,
        required: false
    }
}, {timestamps: true}) //automatically adds creatiion/update timestamps for the object

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;