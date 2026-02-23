const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exist"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exist"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/sg9dyvpi0/user-default.webp?updatedAt=1770787382400",
  },
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
