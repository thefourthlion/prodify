const express = require("express");
const router = express.Router();
const {
  createTasks,
  readTasks,
  readTasksFromID,
  updateTasks,
  deleteTasks,
} = require("../controllers/Tasks");
router.route("/create").post(createTasks);
router.route("/read").get(readTasks);
router.route("/read/:id").get(readTasksFromID);
router.route("/update/:id").post(updateTasks);
router.route("/delete/:id").delete(deleteTasks);
module.exports = router;
