import React from "react";
import { Link } from "react-router-dom";
import { MapPin, DollarSign, Clock, ArrowRight } from "lucide-react";
import SaveJobButton from "./SaveJobButton";

import ApplicationStatus from "./ApplicationStatus";
import "./JobCard.css";

export default function JobCard({ job }) {
  if (!job) return null;

  return (
    <article className="job-card" id={`job-card-${job.id}`}>
      <div className="job-card-header">
        <div className="job-company-block">
          <div
            className="company-logo-avatar"
            style={{ backgroundColor: job.logoColor || "#4f46e5" }}
            aria-hidden="true"
          >
            {job.company.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="job-company-name">{job.company}</span>
            <h3 className="job-title">
              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            </h3>
          </div>
        </div>
        <SaveJobButton jobId={job.id} />
      </div>

      <p className="job-card-desc">{job.description}</p>

      {/* Meta tags */}
      <div className="job-meta-row">
        <span className="job-meta-item">
          <MapPin size={14} className="meta-icon" />
          <span>{job.location}</span>
        </span>
        <span className="job-meta-item">
          <DollarSign size={14} className="meta-icon" />
          <span>{job.salary}</span>
        </span>
        <span className="job-meta-item">
          <Clock size={14} className="meta-icon" />
          <span>{job.postedDate}</span>
        </span>
      </div>

      {/* Skills Badges */}
      <div className="job-skills-list">
        <span className="badge badge-primary">{job.jobType}</span>
        <span className="badge badge-neutral">{job.experienceLevel}</span>
        {job.skills?.slice(0, 3).map((skill, index) => (
          <span key={index} className="skill-chip">
            {skill}
          </span>
        ))}
        {job.skills?.length > 3 && (
          <span className="skill-chip more-tag">+{job.skills.length - 3}</span>
        )}
      </div>

      <div className="job-card-divider" />

      {/* Actions and Tracker Footer */}
      <div className="job-card-footer">
        <ApplicationStatus jobId={job.id} compact={true} />
        <Link to={`/jobs/${job.id}`} className="btn-view-details">
          <span>View Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
