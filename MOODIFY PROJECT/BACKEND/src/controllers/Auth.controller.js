const UserModel = require("../models/Auth.model");
const BlacklistModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(400).json({
        message:
          isUserExist.username === username
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
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

    // validation (same style as register)
    if ((!email && !username) || !password) {
      return res.status(400).json({
        message: "Email or username and password required",
      });
    }

    // check user
    const user = await UserModel.findOne({
      $or: [{ email }, { username }],
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // generate token (same as register)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // set cookie (same config)
    res.cookie("token", token, {
      httpOnly: true,
    });

    // response (same structure as register)
    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
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
  try {
    const user = await UserModel.findById(userId);
    return res.status(200).json({
      mesage: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    // blacklist token
    await redis.set(token, Date.now().toString(), "EX", 60 * 60);

    // clear cookie AFTER blacklisting
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutController,
};
