const express = require("express");
const { registerUser } = require("../Controller/authController");
const authRouter = express.Router();

authRouter.get("/get", registerUser);

module.exports = authRouter;
