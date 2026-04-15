const Task = require("../models/Task");

// GET ALL
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// ADD TASK
exports.createTask = async (req, res) => {
  try {
    const { title, priority } = req.body;

    const task = new Task({
      title,
      priority: priority || "Medium"
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE (toggle / edit)
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};