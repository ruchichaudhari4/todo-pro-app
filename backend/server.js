require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ ROUTES (ONLY TASKS - SAFE)
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// ❌ AUTH ROUTES ABHI MAT LAGA (baad me karenge)
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

// ✅ DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ✅ SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});