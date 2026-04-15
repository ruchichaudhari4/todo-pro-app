const Task = require("../models/Task");

// ✅ GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADD TASK
exports.addTask = async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;

    const newTask = new Task({
      title,
      priority,
      dueDate,
      completed: false,
    });

    const saved = await newTask.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { title, priority, dueDate, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        priority,
        dueDate,
        completed,
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};