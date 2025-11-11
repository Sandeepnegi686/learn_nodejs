const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.listen(3000, async (e) => {
  if (e) {
    console.log(e);
    throw new Error(e);
  }
  try {
    await mongoose
      .connect(
        "mongodb+srv://sandeepnegi686_db_user:Zy18mJToj89XcDtw@cluster0.2o429so.mongodb.net/Testing"
      )
      .then(() => console.log("database connected"))
      .catch(() => {
        console.log("database not connected");
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
