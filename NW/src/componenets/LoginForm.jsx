import React, { useState } from "react";

const LoginForm = ({ onClose }) => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Login successful!");
        onClose();
      } else {
        alert("Invalid username or password.");
      }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "linear-gradient(to right, #ff416c, #ff4b2b)",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "20px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
