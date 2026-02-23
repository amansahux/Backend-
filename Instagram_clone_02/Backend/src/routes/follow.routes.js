const express = require("express");
const {
  followUserController,
  unfollowUserController,
} = require("../controllers/follow.controller");
const verifyUser = require("../middleware/auth.middleware");

const followRouter = express.Router();

followRouter.post("/follow/:username", verifyUser, followUserController);
followRouter.post("/unfollow/:username", verifyUser, unfollowUserController);

module.exports = followRouter;
