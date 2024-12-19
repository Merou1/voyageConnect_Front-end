import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css'

const Welcome = () => {
  return(
    <div className="home">
      <h1>Welcome to VoyageConnect - Your Travel Agency</h1>
      <p className='explore'>Explore the world with us!</p>
      <Link to="/register">
        <button className="register-btn">Register</button>
      </Link>
      <footer className="footer">
      <p>&copy; 2025 VoyageConnect. All Rights Reserved.</p>
      </footer>
    </div>
)

}

export default Welcome;
