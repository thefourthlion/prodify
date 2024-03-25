const mongoose = require("mongoose");
const TasksSchema = new mongoose.Schema(
  {
    task: { type: String, required: [true, "Please provide task"] },
    points: { type: String, required: [true, "Please provide points"] },
    timestamp: { type: String, required: [true, "Please provide timestamp"] },
  },
  { timestamps: true }
);
const Tasks = mongoose.model("Tasks", TasksSchema);
module.exports = Tasks;
