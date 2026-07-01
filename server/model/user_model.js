const mongoose = require("mongoose");

// Main authenticated user model.
// The admin panel uses the isAdmin flag from this schema for route/API security.
const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      // New users are end user by default. Admin access must be granted manually.
      default: false,
    },
  },
  { timestamps: true }
);

// Model name must match refs like ref: "User" in Order and Review schemas.
const User = mongoose.model("User", userSchema);

module.exports = User;
