const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

const addTask = asyncHandler(async (req, res) => {
  const { title, email } = req.body;
  const completed = false;
  if (!title || !email) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const authorId = email;
  const task = await Task.create({
    title,
    authorId,
    completed,
  });

  if (task) {
    res.status(201).json({
      _id: task._id,
      title: task.title,
      authorId: task.authorId,
    });
  } else {
    res.status(400);
    throw new Error("Unable to Create User");
  }
});

const findTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ authorId: req.query.email }).sort({
      timestamps: -1,
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const toggleTasks = async (req, res) => {
  try {
    const taskRef = await Task.findById(req.query.id);
    const task = await Task.findOneAndUpdate(
      { _id: req.query.id },
      { completed: !taskRef.completed }
    );
    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const updateTask = async (req, res) => {
  try {
    await Task.findOneAndUpdate(
      { _id: req.query.id },
      { title: req.body.title }
    );
    const task = await Task.findById(req.query.id);
    res.json(task);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.query.id);
    res.json(task);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addTask, findTasks, toggleTasks, updateTask, deleteTask };
