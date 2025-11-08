const UserModel = require("../Model/UserModel.js");

async function getAllUsers(req, res) {
  try {
    const allUsers = await UserModel.find();
    // const allUsers = await UserModel.find({ isActive: false });  // fin
    // const allUsers = await UserModel.findOne({ name: "Sandeep Negi" }); //find the first result
    // const allUsers = await UserModel.find().select("name email -_id");
    // const allUsers = await UserModel.countDocuments({isActive: true}); // count the doucuments
    // const allUsers = await UserModel.find().limit(2).skip(1);
    // const allUsers = await UserModel.find().limit(2).skip(1).sort({ age: 1 });
    res.json({ message: "All users", data: allUsers });
  } catch (error) {
    res.json({ message: "Something went wrong", error });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params || 0;
    const user = await UserModel.findById(id);
    if (user) {
      res.json({ message: "User found", data: user });
    } else {
      res.json({ message: "user not found" });
    }
  } catch (error) {
    res.json({ message: "Something went wrong", error });
  }
}

async function createUser(req, res) {
  try {
    const data = req.body;
    const newUser = await UserModel.create(data);
    res.json({ message: "User Created", data: newUser });
  } catch (error) {
    res.json({ message: "Something went wrong", error });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const newUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json({ message: "User Updated", data: newUser });
  } catch (error) {
    res.json({ message: "Something went wrong", error });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params || 0;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: "User Deleted", data: deleteUser });
    } else {
      res.json({ message: "User not Deleted", data: {} });
    }
  } catch (error) {
    res.json({ message: "Something went wrong", error });
  }
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
