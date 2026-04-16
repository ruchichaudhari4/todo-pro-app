const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ✅ GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD task
router.post("/", async (req, res) => {
  try {
    const { text, priority, date } = req.body;

    const newTask = new Task({
      text,
      priority,
      date,
      completed: false,
    });

    const saved = await newTask.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE task
router.put("/:id", async (req, res) => {
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
});

// ✅ DELETE task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 🔥 CLEAR ALL TASKS (GET METHOD - FIXED)
router.get("/clear/all", async (req, res) => {
  try {
    await Task.deleteMany({});
    res.json({ message: "All tasks deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;