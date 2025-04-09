import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove auth status
    navigate("/login"); // Redirect to login page
    setIsAuthenticated(false); // Update state
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/sos">SOS HELP SYSTEM</Link>
          <Link to="/assessment">ASSESSMENT & QUESTIONNAIRE</Link>
          <Link to="/chatbot">CHATBOT SUPPORT</Link>
          <Link to="/videos">VIDEO RECOMMENDATION SYSTEM</Link>
          <Link to="/mood">MOOD TRACKER</Link>
          <Link to="/news">NEWS API</Link>
          <Link to="/Tasks">TASK MANAGER</Link>
        </div>
        <div className="nav-buttons">
          {isAuthenticated ? (
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/register" className="btn register-btn">Register</Link>
            </>
          )}
        </div>
      </nav>

      <div className="welcome-text">
        <h1>Welcome to the Mental Well-being Platform</h1>
      </div>
    </div>
  );
};

export default Home;
