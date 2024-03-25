const express = require("express");
const router = express.Router();
const {
  createData,
  readData,
  readDataFromID,
  updateData,
  deleteData,
} = require("../controllers/Data");
router.route("/create").post(createData);
router.route("/read").get(readData);
router.route("/read/:id").get(readDataFromID);
router.route("/update/:id").post(updateData);
router.route("/delete/:id").delete(deleteData);
module.exports = router;
