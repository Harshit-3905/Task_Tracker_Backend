const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    numberofTasksCompleted: 0,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Unable to Create User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const incrementTask = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    user.numberofTasksCompleted += 1;
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

const getLeaderboard = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).sort({ numberofTasksCompleted: -1 });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { registerUser, authUser, incrementTask, getLeaderboard };
