import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post(API, { title, priority });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.put(`${API}/${task._id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = async (task) => {
    const newTitle = prompt("Edit task:", task.title);
    if (!newTitle) return;

    try {
      await axios.put(`${API}/${task._id}`, {
        title: newTitle,
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = tasks.filter((t) =>
    (t.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="container">

        {/* HEADER */}
        <div className="header">
          <h1>🚀 Todo Pro</h1>
          <button onClick={() => setDark(!dark)} className="theme-btn">
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* INPUT */}
        <div className="input-section">
          <input
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button onClick={addTask}>Add</button>
        </div>

        {/* SEARCH */}
        <input
          className="search"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* STATS */}
        <div className="stats">
          Total: {tasks.length} | Completed:{" "}
          {tasks.filter((t) => t.completed).length}
        </div>

        {/* TASK LIST */}
        <div className="tasks">
          {filtered.map((t) => (
            <div key={t._id} className="task">
              <div className="left">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t)}
                />

                <span className={t.completed ? "done" : ""}>
                  {t.title} ({t.priority})
                </span>
              </div>

              <div className="right">
                <button onClick={() => editTask(t)}>✏️</button>
                <button onClick={() => deleteTask(t._id)}>❌</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;