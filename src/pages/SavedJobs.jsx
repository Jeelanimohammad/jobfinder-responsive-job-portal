import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, ArrowRight, Search } from "lucide-react";
import { useApp } from "../context/AppContext";

import JobCard from "../components/JobCard";
import "./SavedJobs.css";

export default function SavedJobs() {
  const { jobs, savedJobIds } = useApp();

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <div className="saved-jobs-page">
      <div className="saved-jobs-header-banner">
        <div className="container">
          <div className="saved-header-content">
            <div className="saved-badge">
              <Bookmark size={15} /> Bookmarked Opportunities
            </div>
            <h1 className="saved-page-title">Your Saved Jobs</h1>
            <p className="saved-page-subtitle">
              Review and manage bookmarked listings. Saved roles are automatically preserved in your browser's local storage so you never lose track.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {savedJobs.length === 0 ? (
          <div className="saved-empty-container">
            <div className="saved-empty-icon-box">
              <Bookmark size={40} className="saved-empty-icon" />
            </div>
            <h3 className="saved-empty-title">No Saved Jobs Yet</h3>
            <p className="saved-empty-desc">
              When browsing through job listings, click the bookmark icon on any card to save positions you want to revisit and apply for later.
            </p>
            <Link to="/jobs" className="btn btn-primary btn-lg">
              <Search size={18} /> Explore Open Positions
            </Link>
          </div>
        ) : (
          <div className="saved-content-wrapper">
            <div className="saved-stats-bar">
              <span className="saved-count-indicator">
                You have <strong>{savedJobs.length}</strong> saved {savedJobs.length === 1 ? "position" : "positions"}
              </span>
              <Link to="/jobs" className="btn-continue-search">
                <span>Browse more jobs</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="job-list-grid">
              {savedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
