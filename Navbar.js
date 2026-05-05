import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
export default function Navbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Student Loan</Link>
      <div className="navbar-nav ms-auto">
        {userInfo ? (
          <>
            <Link className="nav-link" to="/profile">{userInfo.name}</Link>
            <button className="btn btn-danger ms-2" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/signup">Signup</Link>
          </>
           )}
      </div>
    </nav>
  );
}

