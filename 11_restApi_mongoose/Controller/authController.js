const UserModel = require("../Model/UserModel");

async function registerUser(req, res) {
  console.log("user registered");
  res.send("registered");
}

module.exports = { registerUser };
