import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../component/LoginStyle.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      console.log("Login successful");

      // Reset the form
      setUsername("");
      setPassword("");
      setError(null);

      // Navigate to the profile page
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your username and password.");
    }
  };

  const handleForgotPassword = () => {
    // Add logic for handling forgot password functionality, such as displaying a modal or redirecting to a forgot password page
    console.log("Forgot Password");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <button type="submit">Login</button>
        <a href="#" onClick={handleForgotPassword} className="forgot-password">
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default Login;
