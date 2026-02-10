const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRouter = express.Router();


authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    const hashPass = crypto.createHash("md5").update(password).digest("hex");
    const user = await userModel.create({
      name,
      email,
      password: hashPass,
    });
    res.status(201).json({
      message: "USer Created Successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create user ",
      error: err.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not exist kindly register first",
      });
    }

    const isPasswordCorrect =
      user.password === crypto.createHash("md5").update(password).digest("hex");
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
    );
    res.cookie("jwt_token", token);
    res.status(200).json({
      message: "User login successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to Login",
      error: err.message,
    });
  }
});

module.exports = authRouter;
