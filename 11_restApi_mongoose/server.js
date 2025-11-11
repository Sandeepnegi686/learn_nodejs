const express = require("express");
const connectDb = require("./Database/db.js");
const Userroute = require("./Routes/userRoute.js");
const authRouter = require("./Routes/authRoute.js");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;
const url = process.env.DATABASE_URL || "";

app.use(express.json());

app.use("/", Userroute);
// app.use("/", authRouter);

app.listen(PORT, () => {
  console.log("server started");
  connectDb(url);
});
