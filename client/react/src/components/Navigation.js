import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function Navigation() {
  const [showLinks, setShowLinks] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  return (
    <div className="Navbar" id="Navbar">
      <ul
        className="nav nav-links"
        id={showLinks ? "nav-active" : "nav-hidden"}
      >
        <li className="nav-item">
          <a className="nav-home" href="/daily-check">
            Daily
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-bio" href="/score-card">
            Score Card
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-tech" href="/add-task">
            Add Task
          </a>
        </li>

        <li>
          {currentUser ? (
            <Button
              variant="success"
              className="nav-btn button"
            >
              Logout
            </Button>
          ) : (
            <a href="login">
              <Button variant="success" className="button">
                Sign In
              </Button>
            </a>
          )}
        </li>
      </ul>
      <h1 className="nav-title">Speed Tests</h1>
      <div className="burger" onClick={() => setShowLinks(!showLinks)}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </div>
  );
}
