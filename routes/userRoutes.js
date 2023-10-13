const express = require("express");
const {
  registerUser,
  authUser,
  incrementTask,
  getLeaderboard,
} = require("../controllers/userController");

const router = express.Router();
router.route("/").post(registerUser);
router.post("/login", authUser);
router.put("/increment", incrementTask);
router.get("/leaderboard", getLeaderboard);

module.exports = router;
