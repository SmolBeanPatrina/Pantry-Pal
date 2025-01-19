import React, { useState } from "react";

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    dietaryRestrictions: "",
    ingredients: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend
      const response = await fetch("http://localhost:4000/register", {  // Make sure the endpoint matches the backend route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Signup successful!");
      } else {
        alert("Error during signup. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check your network connection.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
          <input
            type="text"
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            placeholder="Enter your dietary restrictions"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="ingredients">Preferred Ingredients</label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Enter your preferred ingredients"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "20px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Signup
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
      </div>
    </div>
  );
};

export default SignupForm;
