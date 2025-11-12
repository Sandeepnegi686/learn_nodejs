const UserModel = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const { username, email, password, age } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "username or email is already used by someone",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      age,
    });
    const user = { _id: newUser._id, role: "user", username: newUser.username };
    let token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res
      .status(201)
      .json({ success: true, message: "user is created", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "missing parameters" });
    }
    const user = await UserModel.findOne({ username }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "creadentials invalid" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    console.log(comparePassword);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: false, message: "creadentials invalid" });
    }
    const userToken = {
      _id: user._id,
      role: user.role,
      username: user.username,
    };
    console.log(userToken);
    const token = jwt.sign(userToken, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    return res
      .status(200)
      .json({ success: true, message: "login successfull", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

module.exports = { register, login };
