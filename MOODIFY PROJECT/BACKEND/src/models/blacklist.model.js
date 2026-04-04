const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token is required for blacklisting."],
    },
  },
  { timestamps: true },
);
const BlacklistModel = mongoose.model("Blacklist", blacklistSchema);

module.exports = BlacklistModel;
