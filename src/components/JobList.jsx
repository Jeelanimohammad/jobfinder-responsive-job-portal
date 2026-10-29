import React from "react";
import JobCard from "./JobCard";
import { SearchX, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import "./JobList.css";

export default function JobList({ jobs, isLoading = false, emptyTitle, emptySubtitle }) {
  const { clearAllFilters } = useApp();

  if (isLoading) {
    return (
      <div className="job-list-loading">
        <div className="loading-spinner" />
        <p className="loading-text">Finding best matches for you...</p>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="job-list-empty">
        <div className="empty-icon-circle">
          <SearchX size={38} className="empty-icon" />
        </div>
        <h3 className="empty-title">{emptyTitle || "No matching jobs found"}</h3>
        <p className="empty-desc">
          {emptySubtitle || "We couldn't find any openings matching your active search and filter criteria. Try adjusting keywords or resetting filters."}
        </p>
        <button onClick={clearAllFilters} className="btn btn-outline btn-sm">
          <Sparkles size={14} /> Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="job-list-grid">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
