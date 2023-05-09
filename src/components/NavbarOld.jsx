import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="Navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            exact
            to="/"
            activeClassName="nav-link-active"
            className="nav-link"
          >
            Home
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink
            to="/new-student"
            activeClassName="nav-link-active"
            className="nav-link"
          >
            New Student
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/existing-student"
            activeClassName="nav-link-active"
            className="nav-link"
          >
            Existing Student
          </NavLink>
        </li>
        <li className="nav-item login-btn">
          <NavLink
            to="/login"
            activeClassName="nav-link-active"
            className="nav-link"
          >
            Login
          </NavLink>
        </li> */}
        <li className="nav-item login-btn">
          <a
            href="/planner"
            activeClassName="nav-link-active"
            className="nav-link"
          >
            Planner
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
