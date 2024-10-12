// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true, // Ensure clerkId is unique
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: null, // Optional field
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

module.exports = User;
