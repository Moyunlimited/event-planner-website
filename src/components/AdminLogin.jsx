import React, { useState } from "react";
import API_BASE from "../config"; // adjust the path if needed

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.reload(); // Reload to re-check admin
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div className="card w-50 mx-auto p-4 shadow mt-5">
      <h4 className="text-center mb-3">Admin Login</h4>
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="btn btn-dark w-100">
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
