const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  try {
    const { username, email, password, bio, profileImage } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }
    //   const isUserExist = await userModel.findOne({ email });
    //   if (isUserExist) {
    //     return res.status(409).json({
    //       message: "User already exist",
    //     });
    //   }
    //   const isUsernameExist = await userModel.findOne({ username });
    //   if (isUsernameExist) {
    //     return res.status(409).json({
    //       message: "Username already exist ",
    //     });
    //   }
    const IsUserExist = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (IsUserExist) {
      return res.status(409).json({
        message:
          IsUserExist.email === email
            ? "email already exist "
            : " username already exist",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      password: hashPass,
      email,
      bio,
      profileImage,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
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
    const { email, password, username } = req.body;
    if ((!email && !username) || !password) {
      return res.status(400).json({
        message: "Email/username and password are required",
      });
    }

    const user = await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email/username or password",
      });
    }
    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    res.status(200).json({
      message: "User logged in successfully",
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

module.exports = { registerController, loginController };
