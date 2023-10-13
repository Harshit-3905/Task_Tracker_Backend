const express = require("express");
const {
  addTask,
  findTasks,
  toggleTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();
router.route("/").post(addTask);
router.get("/email", findTasks);
router.get("/id", toggleTasks);
router.put("/id", updateTask);
router.delete("/id", deleteTask);

module.exports = router;
