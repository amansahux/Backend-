const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post are required to like post"],
    },
    user: {
      type: String,
      required: [true, "user are required to like any post"],
    },
  },
  { timestamps: true },
);

likeSchema.index({ post: 1 }, { user: 1 }, { unique: true });

const LikeModel = mongoose.model("likes", likeSchema);

module.exports = LikeModel;
