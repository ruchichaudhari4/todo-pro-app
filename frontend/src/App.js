import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true);

  const [user, setUser] = useState(localStorage.getItem("user"));

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editTaskData, setEditTaskData] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDate, setEditDate] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  // ADD
  const addTask = async () => {
    if (!text.trim()) return toast.error("Enter task");

    await axios.post("http://localhost:5000/api/tasks", {
      text,
      priority,
      date,
    });

    toast.success("Task Added");
    setText("");
    setDate("");
    setPriority("Medium");
    fetchTasks();
  };

  // DELETE
  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    toast.success("Deleted");
    fetchTasks();
  };

  // TOGGLE
  const toggleComplete = async (task) => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  // EDIT OPEN
  const openEdit = (task) => {
    setEditTaskData(task);
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditDate(task.date || "");
  };

  // EDIT SAVE
  const saveEdit = async () => {
    await axios.put(
      `http://localhost:5000/api/tasks/${editTaskData._id}`,
      {
        ...editTaskData,
        text: editText,
        priority: editPriority,
        date: editDate,
      }
    );

    toast.success("Updated");
    setEditTaskData(null);
    fetchTasks();
  };

  // LOGIN / SIGNUP
  const handleAuth = async () => {
    try {
      if (isSignup) {
        await axios.post("http://localhost:5000/api/auth/register", {
          email,
          password,
        });
        toast.success("Signup Success");
        setIsSignup(false);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );

        localStorage.setItem("user", email);
        localStorage.setItem("token", res.data.token);

        toast.success("Login Success");
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error");
    }
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  // LOGIN UI
  if (!user) {
    return (
      <div className="login-container">
        <Toaster />
        <div className="login-card">
          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleAuth}>
            {isSignup ? "Signup" : "Login"}
          </button>

          <p onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login instead" : "Create account"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${dark ? "dark" : "light"}`}>
      <Toaster />

      <div className="card">
        <div className="top-bar">
          <h1>🚀 Todo Pro</h1>

          <div>
            <button className="theme-btn" onClick={() => setDark(!dark)}>
              🌗
            </button>

            <button
              className="logout"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="input-row">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task..."
            onKeyDown={(e) => e.key === "Enter" && addTask()}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        <input
          className="search"
          placeholder="Search task..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <p>
          Total: {total} | Completed: {completed}
        </p>

        {filteredTasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          filteredTasks.map((task) => (
            <div className="task" key={task._id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />

              <span className={task.completed ? "done" : ""}>
                {task.text}
              </span>

              <span className={task.priority.toLowerCase()}>
                {task.priority}
              </span>

              <span>
                {task.date
                  ? new Date(task.date).toLocaleDateString("en-IN")
                  : "-"}
              </span>

              <div className="actions">
                <button className="edit" onClick={() => openEdit(task)}>
                  Edit
                </button>

                <button
                  className="delete"
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
      {editTaskData && (
        <div className="modal">
          <div className="modal-content">
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

            <div className="modal-buttons">
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditTaskData(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;