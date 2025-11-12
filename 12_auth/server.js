const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/authRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");
const adminAuth = require("./middleware/adminAuthMiddleware");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/", route);

app.get("/home", authMiddleware, function (req, res) {
  console.log(req.user);
  return res.status(200).send("welcome to homepage");
});
app.get("/admin", authMiddleware, adminAuth, function (req, res) {
  console.log(req.user);
  return res.status(200).send("welcome to admin");
});

app.get;

app.listen(3000, async (e) => {
  console.log("server start");
  if (e) {
    console.log(e);
    throw new Error(e);
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("database connected");
  } catch (error) {
    console.log("database not connected");
    console.log(error);
    process.exit(1);
  }
});
