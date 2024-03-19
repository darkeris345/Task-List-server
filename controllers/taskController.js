const Task = require("../models/taskModel");

// Data middleware

exports.currentDataAndTime = (req, res, next) => {
  const currentDate = new Date();
  req.currentDate = currentDate;
  next();
};

// 1. Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const page = +req.query._page || 1;
    const perPage = +req.query._per_page || 4;

    const tasks = await Task.find({})
      .sort({ date: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalCount = await Task.countDocuments();

    res.header("x-total-count", totalCount.toString());

    res.status(200).json({ tasks, totalCount });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 2. Get single task

exports.getTask = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const task = await Task.findOne({ _id });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${_id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// 3. Create task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// 4. Update task

exports.patchTask = async (req, res) => {
  try {
    const { _id } = req.params;
    const task = await Task.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${_id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// 5. Delete task

exports.deleteTask = async (req, res) => {
  try {
    const { _id } = req.params;
    const task = await Task.deleteOne({ _id });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${__filenameid}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
