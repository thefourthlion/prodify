const mongoose = require("mongoose");
const DailyCheckSchema = new mongoose.Schema(
  {
    date: { type: String, required: [true, "Please provide date"] },
    tasks: { type: [String], required: [true, "Please provide tasks"] },
    points: { type: String, required: [true, "Please provide points"] },
    timestamp: { type: String, required: [true, "Please provide timestamp"] },
  },
  { timestamps: true }
);
const DailyCheck = mongoose.model("DailyCheck", DailyCheckSchema);
module.exports = DailyCheck;
