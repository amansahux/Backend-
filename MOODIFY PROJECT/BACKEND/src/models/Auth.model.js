const mongoose = require("mongoose");

const userSchma = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username is required"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});

const UserModel = mongoose.model("Users", userSchma);

module.exports = UserModel;
