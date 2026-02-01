const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

const noteModal = mongoose.model("Notes", noteSchema);

module.exports = noteModal;
