const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
    {
        fileId: { // Imagekit id
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;

