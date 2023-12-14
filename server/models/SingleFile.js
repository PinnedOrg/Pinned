const mongoose = require("mongoose");

const singleFileSchema = new mongoose.Schema(
  {
    fileName: {
        type: String,
        required: [true, "Missing File Name."]
    },
    filePath: {
        type: String,
        required: [true, "Missing File Path."]
    },
    fileType:{
    type: String,
    required: [true, "Missing File Type."]
    },
    fileSize:{
    type: String,
    required: [true, "Missing File Size."]
    }
  },
  {
    timestamps: true,
  }
);

const SingleFile = mongoose.model("SingleFile", singleFileSchema);

module.exports = SingleFile;
