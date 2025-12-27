const Task = require("../models/Task");

/* GET all tasks */
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

/* POST new task */
exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

/* PUT update task */
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};

/* DELETE task */
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
