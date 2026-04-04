const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../model/post.model");
const LikeModel = require("../model/like.model");
const mongoose = require("mongoose");
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});
const CreatePostController = async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    // Upload directly using buffer
    const response = await imagekit.files.upload({
      file: await toFile(Buffer.from(file.buffer), "file"),
      fileName: "image",
      folder: "Instagram/Posts",
    });
    // console.log(response);

    const post = await postModel.create({
      caption,
      postImage: response.url,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};
const GetPostController = async (req, res) => {
  const userId = req.user.id;
  const post = await postModel.find({ user: userId });
  if (!post) {
    return res.status(404).json({
      message: "No post Found for this user",
    });
  }
  res.status(200).json({
    message: "Post Found",
    post,
  });
};
const ToggleLikePostController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        message: "Post ID is required",
      });
    }

    // Optional safety check
    const postExists = await postModel.exists({ _id: postId });
    if (!postExists) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const existingLike = await LikeModel.findOne({
      user: userId,
      post: postId,
    });

    let isLiked;

    if (existingLike) {
      await LikeModel.deleteOne({ _id: existingLike._id });
      isLiked = false;
    } else {
      await LikeModel.create({
        user: userId,
        post: postId,
      });
      isLiked = true;
    }

    // 🔥 Return updated count
    const likeCount = await LikeModel.countDocuments({ post: postId });

    return res.status(200).json({
      success: true,
      isLiked,
      likeCount,
    });
  } catch (error) {
    console.error("Like Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
const GetFeedController = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const posts = await postModel.aggregate([
      // 1. Sort latest
      { $sort: { createdAt: -1 } },

      // 2. Join user
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // 3. Join likes
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post",
          as: "likes",
        },
      },

      // 4. Add computed fields
      {
        $addFields: {
          likeCount: { $size: "$likes" },

          isLiked: {
            $in: [userId, "$likes.user"],
          },
        },
      },

      // 5. Remove unnecessary fields
      {
        $project: {
          "user.password": 0,
          likes: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Feed Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  CreatePostController,
  ToggleLikePostController,
  GetPostController,
  GetFeedController,
};
