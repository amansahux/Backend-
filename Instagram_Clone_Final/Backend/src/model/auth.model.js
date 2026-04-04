const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required to create a user"],
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "Email already exist"],
      unique: [true, "Email are already exist"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Passwod are must for createing a user"],
      minlength: 6,
    },
    bio: {
      type: String,
    },
    profileImage: {
      type: String,
      default:
        "https://ik.imagekit.io/sg9dyvpi0/user-default.webp?updatedAt=1770787382400",
    },
  },
  {
    timestamps: true,
  },
);
const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
