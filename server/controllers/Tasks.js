const Tasks = require("../models/Tasks");
exports.createTasks = async (req, res) => {

  try {
    let newTasks = new Tasks({
      task: req.body.task,
      points: req.body.points,
      timestamp: req.body.timestamp,
    });
    await newTasks.save();
    res.send(newTasks);
  } catch (err) {
    console.log(err);
  }
};
exports.readTasks = async (req, res) => {
  const page = req.query.page || 0;
  const limit = req.query.limit || 25;
  try {
    Tasks.find({}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    })
      .sort()
      .skip(page * limit)
      .limit(limit);
  } catch (err) {
    console.log(err);
  }
};
exports.readTasksFromID = async (req, res) => {
  try {
    await Tasks.findById({ _id: req.params.id }, {}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateTasks = async (req, res) => {
  try {
    await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        task: req.body.task,
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
exports.deleteTasks = async (req, res) => {
  try {
    if ((await Tasks.findById(req.params.id)) === null) {
      res.json({ app: "post not found" });
    } else {
      await Tasks.findByIdAndRemove(req.params.id).exec();
      res.json({ app: "post deleted" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
