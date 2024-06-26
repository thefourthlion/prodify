const express = require("express");
const router = express.Router();
const {
  createDailyCheck,
  readDailyCheck,
  readDailyCheckFromID,
  updateDailyCheck,
  deleteDailyCheck,
} = require("../controllers/DailyCheck");
router.route("/create").post(createDailyCheck);
router.route("/read").get(readDailyCheck);
router.route("/read/:id").get(readDailyCheckFromID);
router.route("/update/:id").post(updateDailyCheck);
router.route("/delete/:id").delete(deleteDailyCheck);
module.exports = router;
