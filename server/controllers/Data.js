const Data = require("../models/Data");
exports.createData = async (req, res) => {
  const page = req.query.page || 0;
  const limit = req.query.limit || 25;
  try {
    let newData = new Data({ first: req.body.first, last: req.body.last });
    await newData.save();
    res.send(newData);
  } catch (err) {
    console.log(err);
  }
};
exports.readData = async (req, res) => {
  try {
    Data.find({}, (err, result) => {
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
exports.readDataFromID = async (req, res) => {
  try {
    await Data.findById({ _id: req.params.id }, {}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateData = async (req, res) => {
  try {
    await Data.findByIdAndUpdate(
      req.params.id,
      { first: req.body.first, last: req.body.last },
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
exports.deleteData = async (req, res) => {
  try {
    if ((await Data.findById(req.params.id)) === null) {
      res.json({ app: "post not found" });
    } else {
      await Data.findByIdAndRemove(req.params.id).exec();
      res.json({ app: "post deleted" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
