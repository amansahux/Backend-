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
      return res.status(409).json({
        message: "User already exist please Login",
      });
    }
    const hasPass = crypto.createHash("md5").update(password).digest("hex");
    const user = await userModel.create({
      name,
      email,
      password: hasPass,
    });
    res.status(201).json({
      message: "User register successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(409).json({
        message: "User not exist kindly sign",
      });
    }
    const isPassCorrect =
      user.password === crypto.createHash("md5").update(password).digest("hex");
    if (!isPassCorrect) {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
    );
    res.cookie("jwt_token", token);
    res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to login user",
      error: error.message,
    });
  }
});

module.exports = authRouter;
