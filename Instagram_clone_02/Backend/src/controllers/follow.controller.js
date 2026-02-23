const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followUserController = async (req, res) => {
  try {
    const followerUsername = req.user?.username;
    const followeeUsername = req.params.username;

    if (!followerUsername) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    if (!followeeUsername) {
      return res.status(400).json({
        message: "Username parameter is required",
      });
    }
    if (followeeUsername === followerUsername) {
      return res.status(400).json({
        message: "You can't follow yourself",
      });
    }

    const isFolloweeExist = await userModel.findOne({
      username: followeeUsername,
    });
    if (!isFolloweeExist) {
      return res.status(404).json({
        message: "The Guy you want to follow doesn't exist",
      });
    }
    const isAlreadyFollowing = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
    });
    if (isAlreadyFollowing) {
      return res.status(409).json({
        message: `You already following ${followeeUsername}`,
      });
    }

    const FollowRecord = await followModel.create({
      follower: followerUsername,
      followee: followeeUsername,
    });
    res.status(201).json({
      message: `You are now following ${followeeUsername}`,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong during follow",
      error: err.message,
    });
  }
};
const unfollowUserController = async (req, res) => {
  try {
    const unfollowerUsername = req.user?.username;
    const unfolloweeUsername = req.params.username;

    if (!unfollowerUsername) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    if (!unfolloweeUsername) {
      return res.status(400).json({
        message: "Username parameter is required",
      });
    }
    if (unfolloweeUsername === unfollowerUsername) {
      return res.status(400).json({
        message: "You can't follow/unfollow yourself ",
      });
    }
    const isFollowing = await followModel.find({
      follower: unfollowerUsername,
      followee: unfolloweeUsername,
    });
    if (!isFollowing) {
      return res.status(200).json({
        message: `You are not following ${unfolloweeUsername}`,
      });
    }
    await followModel.deleteOne({
      follower: unfollowerUsername,
      followee: unfolloweeUsername,
    });
    res.status(200).json({
      message: `You are unfollow ${unfolloweeUsername}`,
    });
  } catch (err) {
    res.status(500).json({
      message: `Something went wrong during Unfollow ${unfolloweeUsername}`,
    });
  }
};
module.exports = { followUserController, unfollowUserController };
