import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Heart, Mail, ShieldCheck } from "lucide-react";
import "./Footer.css";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {

  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <Briefcase size={20} />
              </div>
              <span className="footer-logo-text">
                Job<span>Finder</span>
              </span>
            </Link>
            <p className="footer-desc">
              A modern job search portal designed for developers and tech professionals to discover curated opportunities, bookmark top picks, and streamline their career applications.
            </p>
            <div className="footer-badge-tag">
              <ShieldCheck size={16} /> 100% Free & Verified Listings
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/jobs">All Job Openings</Link></li>
              <li><Link to="/jobs?category=Software+Development">Software Engineering</Link></li>
              <li><Link to="/jobs?category=Design+%26+Creative">UI/UX Design</Link></li>
              <li><Link to="/jobs?category=DevOps+%26+Cloud">DevOps & Cloud</Link></li>
              <li><Link to="/jobs?category=Data+%26+Analytics">Data & AI</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Candidate Tools</h4>
            <ul className="footer-links">
              <li><Link to="/saved">Saved Bookmarks</Link></li>
              <li><Link to="/tracker">Application Tracker</Link></li>
              <li><Link to="/jobs?type=Internship">Internship Programs</Link></li>
              <li><Link to="/jobs?location=Remote">Remote Friendly Roles</Link></li>
            </ul>
          </div>

          {/* Developer / Portfolio Note */}
          <div className="footer-col">
            <h4 className="footer-title">Portfolio Project</h4>
            <p className="portfolio-note">
              Built with React.js, modern CSS, and LocalStorage state persistence. Perfect demonstration of responsive UI, modular components, and real-world frontend workflows.
            </p>
            <div className="footer-social-links">
              <a
                href="https://github.com/Jeelanimohammad/jobfinder-responsive-job-portal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="mailto:contact@example.com" aria-label="Contact" className="social-icon">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {CURRENT_YEAR} JobFinder Portal. Designed and built with <Heart size={14} className="heart-icon" /> for tech careers.</p>
          <div className="footer-bottom-links">

            <span>Client-side SPA</span>
            <span>•</span>
            <span>Vite + React</span>
            <span>•</span>
            <span>No external API keys required</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
