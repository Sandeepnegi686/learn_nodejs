const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, lowercase: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, required: true, select: false },
    age: { type: Number },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

const Model = mongoose.model("User", Schema);

module.exports = Model;
