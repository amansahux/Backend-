const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const CreatepostController = async (req, res) => {
  // console.log(req.body, req.file);
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }
    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized access",
        error: err.message,
      });
    }
    // console.log(decoded);
    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "image",
      folder: "Cohort-2-insta-clone",
    });
    const post = await postModel.create({
      caption: req.body.caption,
      imageUrl: file.url,
      user: decoded.id,
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
    const token = req.cookies?.token;
    console.log("start")

    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    const userId = decoded.id;
    console.log(decoded)

    const posts = await postModel.find({
      user: userId
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

module.exports = { CreatepostController, getPostController };
