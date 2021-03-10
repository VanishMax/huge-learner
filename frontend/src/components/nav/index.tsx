import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

export default function Nav () {
  return (
    <header className="header">
      <img src="/icons/hl.png" className="nav-img" alt="Huge learner logo" />
      <nav className="header-nav">
        <Link to="/capture">Take picture</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/">About</Link>
      </nav>
    </header>
  );
}
