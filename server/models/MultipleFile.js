const mongoose = require("mongoose");

const multipleFileSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: [true, "Missing Title."]
    },
    files: [Object]
  },
  {
    timestamps: true,
  }
);

const MultipleFile = mongoose.model("MultipleFile", multipleFileSchema);

module.exports = MultipleFile;
