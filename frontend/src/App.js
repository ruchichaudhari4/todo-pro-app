import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/tasks";

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Task cannot be empty ❌");
      return;
    }

    if (editId) {
      const oldTask = tasks.find((t) => t._id === editId);

      await axios.put(`${API}/${editId}`, {
        title,
        priority,
        dueDate,
        completed: oldTask.completed,
      });

      toast.success("Task Updated ✏️");
      setEditId(null);
    } else {
      await axios.post(API, {
        title,
        priority,
        dueDate,
      });

      toast.success("Task Added ✅");
    }

    setTitle("");
    setPriority("low");
    setDueDate("");

    fetchTasks();
  };

  // DELETE
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    toast.info("Task Deleted 🗑️");
    fetchTasks();
  };

  // TOGGLE
  const toggleTask = async (task) => {
    await axios.put(`${API}/${task._id}`, {
      ...task,
      completed: !task.completed,
    });

    toast("Task status changed 🔄");
    fetchTasks();
  };

  // EDIT
  const handleEdit = (task) => {
    setTitle(task.title);
    setPriority(task.priority);
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    setEditId(task._id);
  };

  const filtered = tasks.filter((t) =>
    t.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="card">
        <h1>🚀 Todo Pro</h1>

        <div className="inputBox">
          <input
            type="text"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <input
          className="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <p>Total: {filtered.length}</p>

        {filtered.map((task) => (
          <div className="task" key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />

            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>

            <span
              style={{
                color:
                  task.priority === "high"
                    ? "red"
                    : task.priority === "medium"
                    ? "orange"
                    : "lightgreen",
              }}
            >
              {task.priority}
            </span>

            <span>
              {task.dueDate ? task.dueDate.split("T")[0] : ""}
            </span>

            <button
              onClick={() => handleEdit(task)}
              style={{ background: "#22c55e", marginRight: "5px" }}
            >
              Edit
            </button>

            <button onClick={() => deleteTask(task._id)}>X</button>
          </div>
        ))}
      </div>

      {/* 🔥 TOAST */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;