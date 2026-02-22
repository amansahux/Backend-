const express = require("express");
const { followUserController, unfollowUserController } = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");
const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, followUserController);

/** 
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */
userRouter.delete("/unfollow/:username", identifyUser, unfollowUserController);


module.exports = userRouter
