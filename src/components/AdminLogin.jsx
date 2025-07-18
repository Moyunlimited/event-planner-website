import React, { useState } from "react";
import API_BASE from "../config"; // Make sure this points to your backend

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        credentials: "include", // ✅ Required for session cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Optionally show success, or redirect/reload
        window.location.reload();
      } else {
        const err = await res.json();
        alert(err.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Could not connect to backend");
    }
  };

  return (
    <div className="card w-50 mx-auto p-4 shadow mt-5">
      <h4 className="text-center mb-3">🔒 Admin Login</h4>
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="btn btn-dark w-100">
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
