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

    // Check followee exists
    const followee = await userModel.findOne({
      username: followeeUsername,
    });

    if (!followee) {
      return res.status(404).json({
        message: "User you are trying to follow does not exist",
      });
    }

    // Check already following (important: both follower + followee)
    const isAlreadyFollowing = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
    });

    if (isAlreadyFollowing) {
      return res.status(409).json({
        message: "You are already following this user",
      });
    }

    const followRecord = await followModel.create({
      follower: followerUsername,
      followee: followeeUsername,
    });

    return res.status(201).json({
      message: `You are now following ${followeeUsername}`,
      follow: followRecord,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error while following user",
      error: err.message,
    });
  }
};

const unfollowUserController = async (req, res) => {
  try {
    const followerUsername = req.user?.username;
    const followeeUsername = req.params.username;

    if (!followerUsername) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!followeeUsername) {
      return res.status(400).json({
        message: "Username parameter is required",
      });
    }
    if (followerUsername === followeeUsername) {
  return res.status(400).json({
    message: "You cannot unfollow/follow yourself",
  });
}
    const isUserFollowing = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
    });


    if (!isUserFollowing) {
      return res.status(200).json({
        message: `You are not following ${followeeUsername}`,
      });
    }

    await followModel.deleteOne({
      follower: followerUsername,
      followee: followeeUsername,
    });

    return res.status(200).json({
      message: `You have unfollowed ${followeeUsername}`,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error while unfollowing user",
      error: err.message,
    });
  }
};

module.exports = { followUserController, unfollowUserController };
