const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: { type: String, require: true },
  category: { type: String, require: true },
  isStock: { type: Boolean, require: true },
  price: { type: Number, require: true },
});

module.exports = mongoose.model("Products", schema);
