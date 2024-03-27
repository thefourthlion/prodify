const DailyCheck = require("../models/DailyCheck");
exports.createDailyCheck = async (req, res) => {
  try {
    let newDailyCheck = new DailyCheck({
      date: req.body.date,
      tasks: req.body.tasks,
      points: req.body.points,
      timestamp: req.body.timestamp,
    });
    await newDailyCheck.save();
    res.send(newDailyCheck);
  } catch (err) {
    console.log(err);
  }
};
exports.readDailyCheck = async (req, res) => {
  const page = req.query.page || 0;
  const limit = req.query.limit || 25;
  try {
    DailyCheck.find({}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    })
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);
  } catch (err) {
    console.log(err);
  }
};
exports.readDailyCheckFromID = async (req, res) => {
  try {
    await DailyCheck.findById({ _id: req.params.id }, {}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateDailyCheck = async (req, res) => {
  try {
    await DailyCheck.findByIdAndUpdate(
      req.params.id,
      {
        date: req.body.date,
        tasks: req.body.tasks,
        points: req.body.points,
        timestamp: req.body.timestamp,
      },
      (err, result) => {
        if (err) {
          res.json({ app: err });
        }
        res.send(result);
      }
    );
  } catch (err) {
    console.log(err);
  }
};
exports.deleteDailyCheck = async (req, res) => {
  try {
    if ((await DailyCheck.findById(req.params.id)) === null) {
      res.json({ app: "post not found" });
    } else {
      await DailyCheck.findByIdAndRemove(req.params.id).exec();
      res.json({ app: "post deleted" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
