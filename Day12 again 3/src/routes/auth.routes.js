const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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
        message: "User already exists",
      });
    }
    const user = await userModel.create({
      name,
      email,
      password: crypto.createHash("sha256").update(password).digest("hex"),
    });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("jwt__token", token);
    res.status(201).json({
      message: "User register sccessfully",
      user: {
        id: user._id,
        name: user.name,
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
});

authRouter.get("/get-me", async (req, res) => {
  try {
    const token = req.cookies?.jwt__token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User verified successfully",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong while verifying token",
      error: err.message,
    });
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect =
      user.password ===
      crypto.createHash("sha256").update(password).digest("hex");
    //   console.log(crypto.createHash("sha256").update(user.password).digest("hex"))
    //   console.log(password)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong ",
      error: err.message,
    });
  }
});
module.exports = authRouter;
