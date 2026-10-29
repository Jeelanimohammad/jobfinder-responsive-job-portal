import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Briefcase, Bookmark, CheckCircle2, Search, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const { savedJobIds, applicationStatuses } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const savedCount = savedJobIds.length;
  const trackedCount = Object.keys(applicationStatuses).length;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon-box">
            <Briefcase size={22} className="logo-icon" />
          </div>
          <span className="logo-text">
            Job<span className="logo-accent">Finder</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Home
          </NavLink>
          <NavLink to="/jobs" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Browse Jobs
          </NavLink>
          <NavLink to="/saved" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            <Bookmark size={16} />
            <span>Saved</span>
            {savedCount > 0 && <span className="counter-pill">{savedCount}</span>}
          </NavLink>
          <NavLink to="/tracker" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            <CheckCircle2 size={16} />
            <span>Applications</span>
            {trackedCount > 0 && <span className="counter-pill tracker-pill">{trackedCount}</span>}
          </NavLink>
        </nav>

        {/* Action Button */}
        <div className="navbar-actions desktop-nav">
          <button
            onClick={() => navigate("/jobs")}
            className="btn btn-primary btn-sm nav-cta-btn"
          >
            <Search size={15} /> Find Jobs
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <NavLink to="/" end onClick={closeMenu} className="mobile-nav-link">
            Home
          </NavLink>
          <NavLink to="/jobs" onClick={closeMenu} className="mobile-nav-link">
            Browse Jobs
          </NavLink>
          <NavLink to="/saved" onClick={closeMenu} className="mobile-nav-link">
            <Bookmark size={18} />
            <span>Saved Jobs</span>
            {savedCount > 0 && <span className="counter-pill">{savedCount}</span>}
          </NavLink>
          <NavLink to="/tracker" onClick={closeMenu} className="mobile-nav-link">
            <CheckCircle2 size={18} />
            <span>Application Tracker</span>
            {trackedCount > 0 && <span className="counter-pill tracker-pill">{trackedCount}</span>}
          </NavLink>
          <button
            onClick={() => {
              closeMenu();
              navigate("/jobs");
            }}
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            <Search size={16} /> Search All Jobs
          </button>
        </div>
      )}
    </header>
  );
}
