import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ExternalLink,
  Trash2,
  Search,
  Calendar
} from "lucide-react";
import { useApp } from "../context/AppContext";
import ApplicationStatus from "../components/ApplicationStatus";
import "./ApplicationTracker.css";


const STAGES = [
  { key: "All", label: "All Tracked" },
  { key: "Interested", label: "Interested", color: "#0ea5e9" },
  { key: "Applied", label: "Applied", color: "#4f46e5" },
  { key: "Interviewing", label: "Interviewing", color: "#f59e0b" },
  { key: "Offered", label: "Offer Received", color: "#10b981" },
  { key: "Rejected", label: "Not Selected", color: "#ef4444" }
];

export default function ApplicationTracker() {
  const { jobs, applicationStatuses, updateApplicationStatus } = useApp();
  const [activeStageFilter, setActiveStageFilter] = useState("All");

  // Filter jobs that have an application status registered
  const trackedJobEntries = Object.entries(applicationStatuses).map(([jobId, info]) => {
    const jobData = jobs.find((j) => j.id === jobId);
    return {
      jobId,
      status: info.status,
      updatedAt: info.updatedAt,
      notes: info.notes,
      job: jobData
    };
  }).filter((item) => item.job !== undefined);

  const filteredEntries = trackedJobEntries.filter((item) => {
    if (activeStageFilter === "All") return true;
    return item.status === activeStageFilter;
  });

  const getStageCount = (stageKey) => {
    if (stageKey === "All") return trackedJobEntries.length;
    return trackedJobEntries.filter((item) => item.status === stageKey).length;
  };

  return (
    <div className="tracker-page">
      <div className="tracker-header-banner">
        <div className="container">
          <div className="tracker-header-content">
            <div className="tracker-badge">
              <CheckCircle2 size={15} /> Application Pipeline
            </div>
            <h1 className="tracker-page-title">Candidate Application Tracker</h1>
            <p className="tracker-page-subtitle">
              Monitor your job search pipeline in one place. Update stages from initial interest to offers, review interview statuses, and stay organized.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stage Filter Tabs */}
        <div className="tracker-tabs-row">
          {STAGES.map((stage) => {
            const count = getStageCount(stage.key);
            const isActive = activeStageFilter === stage.key;
            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => setActiveStageFilter(stage.key)}
                className={`tracker-tab-btn ${isActive ? "active" : ""}`}
              >
                <span>{stage.label}</span>
                <span className="tracker-tab-pill">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Content Section */}
        {filteredEntries.length === 0 ? (
          <div className="tracker-empty-card">
            <div className="tracker-empty-icon-circle">
              <CheckCircle2 size={40} className="tracker-empty-icon" />
            </div>
            <h3 className="tracker-empty-heading">
              {trackedJobEntries.length === 0
                ? "Your Application Tracker is Clean"
                : `No jobs in the "${activeStageFilter}" stage`}
            </h3>
            <p className="tracker-empty-text">
              {trackedJobEntries.length === 0
                ? "As you browse listings or apply, mark jobs as Interested, Applied, or Interviewing to track progress here."
                : "Switch to 'All Tracked' or browse more open positions to expand your job hunt."}
            </p>
            <Link to="/jobs" className="btn btn-primary btn-lg">
              <Search size={18} /> Discover Jobs to Track
            </Link>
          </div>
        ) : (
          <div className="tracker-table-card">
            <div className="tracker-table-responsive">
              <table className="tracker-table">
                <thead>
                  <tr>
                    <th>Job Title & Company</th>
                    <th>Location & Type</th>
                    <th>Compensation</th>
                    <th>Current Status</th>
                    <th>Last Updated</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map(({ jobId, updatedAt, notes, job }) => (
                    <tr key={jobId}>

                      <td>
                        <div className="table-job-info">
                          <div
                            className="table-avatar"
                            style={{ backgroundColor: job.logoColor || "#4f46e5" }}
                          >
                            {job.company.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <Link to={`/jobs/${job.id}`} className="table-job-title">
                              {job.title}
                            </Link>
                            <span className="table-company-name">{job.company}</span>
                            {notes && <span className="table-job-notes">"{notes}"</span>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="table-col-text">
                          <span className="bold-text">{job.location}</span>
                          <span className="muted-text">{job.jobType}</span>
                        </div>
                      </td>
                      <td>
                        <span className="table-salary">{job.salary}</span>
                      </td>
                      <td>
                        <ApplicationStatus jobId={job.id} />
                      </td>
                      <td>
                        <div className="table-date">
                          <Calendar size={13} className="date-icon" />
                          <span>{updatedAt || "Recently"}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="table-actions">
                          <Link to={`/jobs/${job.id}`} className="btn-table-action" title="View details">
                            <ExternalLink size={15} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => updateApplicationStatus(job.id, "None")}
                            className="btn-table-action remove"
                            title="Remove from tracker"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
