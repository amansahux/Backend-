const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postImage: {
      type: String,
      required: true, // image URL (Cloudinary, etc.)
    },
    caption: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // relation with User model
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
