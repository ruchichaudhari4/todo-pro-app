import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { toast } from "react-toastify";

const API = "http://localhost:5000/api/auth";

function Auth({ setLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(`${API}/login`, { email, password });
        localStorage.setItem("token", res.data.token);
        toast.success("Login success 🔥");
        setLoggedIn(true);
      } else {
        await axios.post(`${API}/register`, {
          name,
          email,
          password,
        });
        toast.success("Registered 🎉");
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="container dark">
      <div className="card">
        <h1>{isLogin ? "Login" : "Register"}</h1>

        {!isLogin && (
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
          {isLogin ? "Create account" : "Already have account?"}
        </p>
      </div>
    </div>
  );
}

export default Auth;