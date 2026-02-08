const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();
authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(409).json({
      message: "User already exist  with this email ",
    });
  }
  const hashPass = crypto.createHash("md5").update(password).digest("hex");
  const user = await userModel.create({
    email,
    name,
    password: hashPass,
  });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User create successfully",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "Protected route accessed successfully",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Invalid email try to sign in",
    });
  }
  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);
  res.status(200).json({
    message: "user logged in",
    user,
  });
});
module.exports = authRouter;
