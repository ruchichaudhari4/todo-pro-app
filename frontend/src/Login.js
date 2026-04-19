import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
    try {
      const url = isSignup
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const res = await axios.post(url, { email, password });

      if (!isSignup) {
        localStorage.setItem("token", res.data.token);
        setUser(true);
      } else {
        alert("Signup success, now login");
        setIsSignup(false);
      }
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🚀 {isSignup ? "Create Account" : "Welcome Back"}</h2>

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
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p onClick={() => setIsSignup(!isSignup)} className="toggle">
          {isSignup ? "Already have account? Login" : "Create account"}
        </p>
      </div>
    </div>
  );
}

export default Login;