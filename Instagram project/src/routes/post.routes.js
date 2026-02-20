const express = require("express");
const {
  CreatepostController,
  getPostController,
} = require("../controllers/post.controllers");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), CreatepostController);

postRouter.get("/", getPostController);
module.exports = postRouter;
