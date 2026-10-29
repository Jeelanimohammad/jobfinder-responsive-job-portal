import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Search,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Code2,
  Palette,
  BarChart3,
  Cloud,
  Smartphone,
  Compass,
  Megaphone,
  ShieldCheck,
  Headphones
} from "lucide-react";

import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import { useApp } from "../context/AppContext";
import { JOB_CATEGORIES } from "../data/jobsData";
import "./Home.css";

const CATEGORY_ICONS = {
  "Software Development": Code2,
  "Design & Creative": Palette,
  "Data & Analytics": BarChart3,
  "DevOps & Cloud": Cloud,
  "Mobile Development": Smartphone,
  "Product Management": Compass,
  "Marketing & Sales": Megaphone,
  "Operations & Support": Headphones
};

export default function Home() {
  const { jobs, setSelectedCategory } = useApp();
  const navigate = useNavigate();

  const featuredJobs = jobs.filter((j) => j.featured).slice(0, 6);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    navigate("/jobs");
  };

  const handleSearchSubmit = () => {
    navigate("/jobs");
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>Discover Over 15+ Verified Opportunities</span>
          </div>

          <h1 className="hero-title">
            Land Your Dream Role in <span className="gradient-text">Modern Tech</span>
          </h1>

          <p className="hero-subtitle">
            JobFinder connects ambitious engineers, designers, and innovators with high-growth companies. Filter by stack, bookmark favorites, and track your interview applications with ease.
          </p>

          <div className="hero-search-wrapper">
            <SearchBar onSearchSubmit={handleSearchSubmit} />
          </div>

          {/* Popular Search tags */}
          <div className="hero-tags-row">
            <span className="tags-label">Popular Searches:</span>
            {["React", "Frontend", "Remote", "Junior", "Node.js", "Design"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  navigate(`/jobs?q=${tag}`);
                }}
                className="hero-tag-btn"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Quick Metrics */}
          <div className="hero-metrics-grid">
            <div className="metric-box">
              <span className="metric-number">100%</span>
              <span className="metric-label">Client-side & Free</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <span className="metric-number">16+</span>
              <span className="metric-label">Curated Job Roles</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <span className="metric-number">5-Stage</span>
              <span className="metric-label">Application Tracker</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <span className="metric-number">Zero</span>
              <span className="metric-label">External API Keys Needed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Explore Domains</span>
              <h2 className="section-title">Browse By Category</h2>
            </div>
            <Link to="/jobs" className="section-view-all">
              <span>View All Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="categories-grid">
            {JOB_CATEGORIES.filter((c) => c.name !== "All Categories").map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.name] || Briefcase;
              return (
                <div
                  key={cat.name}
                  className="category-card"
                  onClick={() => handleCategoryClick(cat.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleCategoryClick(cat.name);
                  }}
                >
                  <div className="category-icon-box">
                    <IconComp size={24} />
                  </div>
                  <h3 className="category-name">{cat.name}</h3>
                  <span className="category-count">{cat.count} openings</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs-section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>
                <TrendingUp size={13} /> Highly Recommended
              </div>
              <h2 className="section-title">Featured Opportunities</h2>
              <p className="section-desc">Hand-picked top tier engineering and design opportunities actively hiring right now.</p>
            </div>
            <Link to="/jobs" className="btn btn-outline">
              <span>Explore All Jobs</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="featured-grid">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="browse-all-cta-banner">
            <div className="cta-banner-content">
              <h3>Looking for more tailored positions?</h3>
              <p>Filter through dozens of remote, internship, and senior roles across 10+ tech specializations.</p>
            </div>
            <Link to="/jobs" className="btn btn-primary btn-lg">
              <Search size={18} /> Browse 16+ Open Positions
            </Link>
          </div>
        </div>
      </section>

      {/* Features Overview Value Prop */}
      <section className="value-prop-section">
        <div className="container">
          <div className="value-prop-card">
            <div className="value-grid">
              <div className="value-item">
                <div className="value-icon-circle">
                  <Search size={24} />
                </div>
                <h4>Instant Combined Filtering</h4>
                <p>Filter simultaneously by job type, experience level, remote availability, and keyword match in real-time.</p>
              </div>
              <div className="value-item">
                <div className="value-icon-circle">
                  <CheckCircle size={24} />
                </div>
                <h4>Built-in Application Tracker</h4>
                <p>Track your applications across Interested, Applied, Interviewing, and Offered stages persisted with LocalStorage.</p>
              </div>
              <div className="value-item">
                <div className="value-icon-circle">
                  <ShieldCheck size={24} />
                </div>
                <h4>Zero-Friction Bookmarking</h4>
                <p>Save interesting postings with a single tap to revisit and compare whenever you are ready to apply.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
