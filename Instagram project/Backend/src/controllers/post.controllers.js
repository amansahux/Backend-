const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");
const mongoose = require("mongoose");

const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const CreatepostController = async (req, res) => {
  // console.log(req.body, req.file);
  try {
    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "image",
      folder: "Cohort-2-insta-clone",
    });
    const userId = req.user.id;
    const post = await postModel.create({
      caption: req.body.caption,
      imageUrl: file.url,
      user: userId,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const getPostController = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await postModel.find({
      user: userId,
    });

    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error while fetching posts",
      error: err.message,
    });
  }
};
const getPostDetailsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params?.postId;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not Found.",
      });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({
        message: "Forbidden content",
      });
    }

    return res.status(200).json({
      message: "Post Details fetched successfully",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error while fetching posts",
      error: err.message,
    });
  }
};

const toggleLikeController = async (req, res) => {
  try {
    const userId = req.user?.id;
    const postId = req.params.postId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const existingLike = await likeModel.findOne({
      post: postId,
      user: userId,
    });

    // 🔁 TOGGLE LOGIC
    if (existingLike) {
      await likeModel.deleteOne({
        post: postId,
        user: userId,
      });

      return res.status(200).json({
        message: "Post unliked",
        liked: false,
      });
    }

    await likeModel.create({
      post: postId,
      user: userId,
    });

    return res.status(201).json({
      message: "Post liked",
      liked: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error while toggling like",
      error: err.message,
    });
  }
};

module.exports = {
  CreatepostController,
  getPostController,
  getPostDetailsController,
  toggleLikeController,
};
