const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
