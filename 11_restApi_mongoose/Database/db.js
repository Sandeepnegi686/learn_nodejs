const mongoose = require("mongoose");

async function connectDb(url) {
  try {
    await mongoose.connect(url);
    console.log("database connected");
  } catch (error) {
    console.log("connection Failed");
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDb;
