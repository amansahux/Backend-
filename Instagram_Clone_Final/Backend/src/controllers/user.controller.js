const UserModel = require("../model/auth.model");
const followModel =require("../model/user.model");

const ToggleFollowController = async (req, res) => {
   try {
    const followerUsername = req.user.username; // logged-in user
    const { username: followingUsername } = req.params; // target user

    // 1. Check valid IDs
    if (!followingUsername) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    // 2. Prevent self-follow
    if (followerUsername === followingUsername) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    // 3. Check target user exists
    const targetUser = await UserModel.findOne({ username: followingUsername });
    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 4. Check if already following
    const existingFollow = await followModel.findOne({
      follower: followerUsername,
      following: followingUsername,
    });

    // 5. Toggle logic
    if (existingFollow) {
      // ❌ Already following → UNFOLLOW
      await followModel.deleteOne({
        follower: followerUsername,
        following: followingUsername,
      });

      return res.status(200).json({
        success: true,
        message: `Unfollowed ${targetUser.username} successfully`,
      });
    } else {
      // ✅ Not following → FOLLOW
      await followModel.create({
        follower: followerUsername,
        following: followingUsername,
      });

      return res.status(201).json({
        success: true,
        message: `Followed ${targetUser.username} successfully`,
      });
    }
  } catch (error) {
    console.error("Toggle Follow Error:", error);

    return res.status(500).json({
      message: "Server error",
      error:error.message
    });
  }
}

module.exports = {ToggleFollowController}