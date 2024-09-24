const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String, // URL to the profile image
      default: "https://example.com/default-profile.png" // Default image URL
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    isActive : {
      type : Boolean,
      default : true
    },
    isDelete : {
      type : Boolean,
      default : false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("users", userSchema);
