const express = require("express");
const { ToggleFollowController } = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");
const userRouter = express.Router();
userRouter.post("/follow/:username", identifyUser, ToggleFollowController);

module.exports = userRouter;
