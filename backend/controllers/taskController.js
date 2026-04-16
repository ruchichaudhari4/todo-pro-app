const Task = require("../models/Task");

// ✅ GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.log("GET ERROR:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { text, priority, date } = req.body;

    // validation
    if (!text) {
      return res.status(400).json({ message: "Task text required" });
    }

    const newTask = new Task({
      text,
      priority,
      date,
      completed: false,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.log("CREATE ERROR:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

// ✅ DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

// ✅ UPDATE TASK (checkbox + edit)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};