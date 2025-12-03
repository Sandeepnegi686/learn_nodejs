const mongoose = require("mongoose");

async function connectDb(URL) {
  try {
    await mongoose.connect(URL);
    console.log("database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDb;
