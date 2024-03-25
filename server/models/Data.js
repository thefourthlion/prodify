const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    first: { type: String, required: [true, "Please provide first"] },
    last: { type: String, required: [true, "Please provide last"] },
  },
  { timestamps: true }
);
const Data = mongoose.model("Data", DataSchema);
module.exports = Data;
