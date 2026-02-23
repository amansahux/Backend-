const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { username, email, password, bio, profileImage } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }
    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExist) {
      return res.status(409).json({
        message:
          isUserExist.email === email
            ? "email already exist"
            : "username already exist ",
      });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email,
      password: hashPass,
      username,
      bio,
      profileImage,
    });
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);

    res.status(201).json({
      message: "User register successfully",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if ((!email && !username) || !password) {
      return res.status(400).json({
        message: "Email/username and password are required",
      });
    }
    const user = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid email/username or password" });
    }
    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};
const getMeController = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(409).json({ message: "Uauthorized access" });
  }
  const user = await userModel.findById(userId);

  res.status(200).json({
    message: "User fetched successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};
module.exports = { registerController, loginController, getMeController };
