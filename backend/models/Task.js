const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: String,
  priority: String,
  date: String,
  completed: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);