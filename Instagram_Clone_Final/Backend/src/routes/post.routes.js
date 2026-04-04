const express = require("express");
const { CreatePostController, ToggleLikePostController, GetPostController, GetFeedController } = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware")
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const postRouter = express.Router();

postRouter.post("/", upload.single("image"), identifyUser, CreatePostController);
postRouter.post("/like/:postId", identifyUser, ToggleLikePostController);
postRouter.get("/", identifyUser, GetPostController)
postRouter.get("/feed", identifyUser, GetFeedController)


module.exports = postRouter;
