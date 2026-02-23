const jwt = require("jsonwebtoken");
const imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model")

const Imagekit = new imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
const CreatepostController = async (req, res) => {
  try {
    // console.log(req.body, req.file);

    const file = await Imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "image",
      folder: "Cohort-2-insta-clone_2",
    });

    const post = await postModel.create({
      caption: req.body.caption,
      ImageUrl: file.url,
      user: req.user.username,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong during post creation",
      error: error.message,
    });
  }
};
const getPostController = async (req, res) => {
  try {
    const username = req.user?.username;

    const posts = await postModel.find({
      user: username,
    });
    if (!posts) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post fetched successfully",
      posts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};
const getDetailPostController = async (req, res) => {
  try {
    const username = req.user?.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }
    if (post.user !== username) {
      return res.status(403).json({
        message: "Forbidden content",
      });
    }
    res.status(200).json({
      message: "Post fetched successfully",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const ToggleLikeController = async (req, res) => {
  try {
    const username = req.user?.username;
    const postId = req.params.postId;

    if (!username) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const isLiked = await likeModel.findOne({
      post: postId,
      user: username,
    });

    if (isLiked) {
      await likeModel.deleteOne({
        post: postId,
        user: username,
      });

      return res.status(200).json({
        message: "Post Unliked successfully",
      });
    }

    await likeModel.create({
      post: postId,
      user: username,
    });

    return res.status(201).json({
      message: "Post Liked Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong during like",
      error: err.message,
    });
  }
};

module.exports = {
  CreatepostController,
  getPostController,
  getDetailPostController,
  ToggleLikeController,
};
