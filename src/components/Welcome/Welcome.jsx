import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css'

const Welcome = () => {
  return(
    <div className="home">
    <nav className="navbar">
      <div>
      <Link to="/" className="logo">
        VoyageConnect
      </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </div>
    </nav>

      <h1>Welcome to VoyageConnect - Your Travel Agency</h1>
      <p>Explore the world with us!</p>
      <Link to="/register">
        <button className="register-btn">Register</button>
      </Link>
      <footer className="footer">
      <p>&copy; 2024 VoyageConnect. All Rights Reserved.</p>
    </footer>
    </div>
)

}

export default Welcome;
