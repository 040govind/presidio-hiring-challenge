import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { jwtDecode } from "jwt-decode";

const Navbar =  () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const t= localStorage.getItem("token") || "";
  const [userData, setUserData] = useState(localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : ""
  );
console.log(userData);
  const isLoggedIn = token == "" ? false : true;
  const isSeller = userData && userData?.user.role == "seller";
   console.log(isLoggedIn,isSeller);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserData("");
    
  };

  useEffect(() => {
    // Do something on token or userData change
  }, [token, userData]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyLogo</Link>
      </div>
      <ul className="navbar-links">
        {!isLoggedIn && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {isLoggedIn && !isSeller && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/view-list">View List</Link></li>
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          </>
        )}
        {isLoggedIn && isSeller && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-property">Add Property</Link></li>
            <li><Link to="/view-list">View List</Link></li>
            <li><Link to="/view-properties">View Your Properties</Link></li>
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          </>
        )}
      </ul>
      <div className="navbar-toggle">
        <span className="navbar-toggle-icon">&#9776;</span>
      </div>
    </nav>
  );
};

export default Navbar;
