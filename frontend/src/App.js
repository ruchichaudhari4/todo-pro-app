import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDate, setEditDate] = useState("");

  const API = "http://localhost:5000/api/tasks";

  // FETCH
  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD
  const addTask = async () => {
    if (!text.trim()) return toast.error("Enter task");

    await axios.post(API, { text, priority, date });
    toast.success("Task added");

    setText("");
    setDate("");
    fetchTasks();
  };

  // DELETE
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    toast.success("Task deleted");
    fetchTasks();
  };

  // TOGGLE
  const toggleTask = async (id, completed) => {
    await axios.put(`${API}/${id}`, { completed: !completed });
    fetchTasks();
  };

  // OPEN EDIT
  const openEdit = (task) => {
    setEditId(task._id);
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditDate(task.date || "");
  };

  // SAVE EDIT
  const saveEdit = async () => {
    await axios.put(`${API}/${editId}`, {
      text: editText,
      priority: editPriority,
      date: editDate,
    });

    toast.success("Task updated");
    setEditId(null);
    fetchTasks();
  };

  // FILTER
  const filteredTasks = tasks.filter((t) =>
    t.text?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`container ${theme}`}>
      <Toaster />

      <div className="card">
        {/* HEADER */}
        <div className="header">
          <h1>🚀 Todo Pro</h1>
          <button
            className="theme-btn"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* INPUT */}
        <div className="input-row">
          <input
            className="task-input"
            placeholder="Enter task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            className="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        {/* SEARCH */}
        <input
          className="search"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* STATS */}
        <p className="stats">
          Total: {filteredTasks.length} | Completed:{" "}
          {filteredTasks.filter((t) => t.completed).length}
        </p>

        {/* TASKS */}
        {filteredTasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className={`task ${task.completed ? "completed" : ""}`}
            >
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task._id, task.completed)
                  }
                />
                <span>{task.text}</span>
              </div>

              <span className={task.priority.toLowerCase()}>
                {task.priority}
              </span>

              <span>{task.date || "-"}</span>

              <div>
                <button
                  className="edit-btn"
                  onClick={() => openEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  X
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* EDIT MODAL */}
      {editId && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Task</h3>

            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />

            <div style={{ marginTop: "10px" }}>
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;