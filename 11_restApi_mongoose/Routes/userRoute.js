const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../Controller/userController");

const Userroute = express.Router();

Userroute.get("/get", getAllUsers);
Userroute.get("/get/:id", getUserById);
Userroute.post("/create", createUser);
Userroute.put("/update/:id", updateUser);
Userroute.delete("/delete/:id", deleteUser);

module.exports = Userroute;
