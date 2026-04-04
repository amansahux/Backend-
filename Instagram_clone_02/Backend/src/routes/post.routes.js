const express = require("express");
const {
  CreatepostController,
  getFeedController,
  getDetailPostController,
  ToggleLikeController,
} = require("../controllers/post.controller");
const multer = require("multer");
const verifyUser = require("../middleware/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post("/", upload.single("image"), verifyUser, CreatepostController);
postRouter.get("/like/:postId", verifyUser, ToggleLikeController);
postRouter.get("/feed", verifyUser, getFeedController);
postRouter.get("/details/:postId", verifyUser, getDetailPostController);
module.exports = postRouter;
