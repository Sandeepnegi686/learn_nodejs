const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, minLength: 3, maxLength: 25, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  username: { type: String, unique: true, required: true },
  age: { type: Number, min: 18, max: 150 },
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
