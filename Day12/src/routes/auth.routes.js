const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({
      message: "User with this email already exist",
    });
  }
  const user = await userModel.create({
    email,
    name,
    password,
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
module.exports = authRouter;
