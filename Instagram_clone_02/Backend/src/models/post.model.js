const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  ImageUrl: {
    type: String,
    required: [true, "Post not created without Image"],
  },
  user: {
    type:String,
    required: [true, "Post not created without user"],
  },
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
