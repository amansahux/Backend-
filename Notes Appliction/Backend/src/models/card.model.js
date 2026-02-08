const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
      required: true,
      unique: [true, "Profile pic must be unique"],
    },
    name: { type: String, required: true },
    bio: { type: String, required: true },
  },
  { timestamps: true },
);

const cardModel = mongoose.model("Cards", cardSchema);

module.exports = cardModel;
