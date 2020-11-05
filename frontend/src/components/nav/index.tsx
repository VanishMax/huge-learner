import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css';

export default function Nav () {
  return (
    <header className="header">
      <img src="/icons/hl.png" className="nav-img" alt="Huge learner logo" />
      <nav className="header-nav">
        <Link to="/">Take picture</Link>
        <Link to="/about">Statistics</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
