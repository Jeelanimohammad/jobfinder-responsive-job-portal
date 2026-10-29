import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Clock,
  Share2,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Send
} from "lucide-react";

import { useApp } from "../context/AppContext";
import SaveJobButton from "../components/SaveJobButton";
import ApplicationStatus from "../components/ApplicationStatus";
import "./JobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, updateApplicationStatus, showToast } = useApp();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantResumeNote, setApplicantResumeNote] = useState("");
  const [hasAppliedSuccess, setHasAppliedSuccess] = useState(false);

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="container" style={{ padding: "5rem 1rem", textAlign: "center" }}>
        <h2>Job Posting Not Found</h2>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 2rem" }}>
          The job you are looking for may have been filled or expired.
        </p>
        <Link to="/jobs" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Job Search
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Job link copied to clipboard!");
    } else {
      showToast("Job link ready to share");
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim()) {
      showToast("Please provide both name and email");
      return;
    }
    // Update application tracking in context
    updateApplicationStatus(job.id, "Applied", `Applied as ${applicantName} (${applicantEmail})`);
    setHasAppliedSuccess(true);
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setHasAppliedSuccess(false);
  };

  return (
    <div className="job-details-page">
      <div className="container">
        {/* Back Link */}
        <div className="job-details-top-bar">
          <button onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={16} /> Back to Listings
          </button>
          <div className="details-top-actions">
            <button onClick={handleShare} className="btn-share-icon" title="Share Job">
              <Share2 size={18} />
            </button>
            <SaveJobButton jobId={job.id} size={20} />
          </div>
        </div>

        {/* Main Header Card */}
        <div className="job-details-header-card">
          <div className="job-header-main">
            <div
              className="job-details-avatar"
              style={{ backgroundColor: job.logoColor || "#4f46e5" }}
            >
              {job.company.substring(0, 2).toUpperCase()}
            </div>
            <div className="job-header-info">
              <span className="job-details-company">{job.company}</span>
              <h1 className="job-details-title">{job.title}</h1>
              <div className="job-details-meta-pills">
                <span className="details-pill">
                  <MapPin size={15} /> {job.location}
                </span>
                <span className="details-pill">
                  <DollarSign size={15} /> {job.salary}
                </span>
                <span className="details-pill">
                  <Clock size={15} /> Posted {job.postedDate}
                </span>
                <span className="badge badge-primary">{job.jobType}</span>
                <span className="badge badge-neutral">{job.experienceLevel} Level</span>
              </div>
            </div>
          </div>

          <div className="job-header-cta-block">
            <button
              onClick={() => setShowApplyModal(true)}
              className="btn btn-primary btn-lg btn-apply-now"
            >
              <Send size={18} /> Apply for this position
            </button>
            <div className="tracker-header-box">
              <span className="tracker-box-label">Your Tracking Status:</span>
              <ApplicationStatus jobId={job.id} />
            </div>
          </div>
        </div>

        {/* 2-Column Body Layout */}
        <div className="job-details-content-grid">
          {/* Left Column: Full Description, Responsibilities, Requirements */}
          <div className="job-details-main-col">
            <section className="details-card">
              <h2 className="details-section-heading">About The Role</h2>
              <p className="details-paragraph">{job.description}</p>
            </section>

            <section className="details-card">
              <h2 className="details-section-heading">Key Responsibilities</h2>
              <ul className="details-bullet-list">
                {job.responsibilities?.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} className="bullet-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="details-card">
              <h2 className="details-section-heading">Qualifications & Skills Required</h2>
              <ul className="details-bullet-list">
                {job.requirements?.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} className="bullet-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="details-card">
              <h2 className="details-section-heading">Technologies & Stack</h2>
              <div className="skills-badge-container">
                {job.skills?.map((skill, index) => (
                  <span key={index} className="skill-badge-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Company Overview & Safety Note */}
          <div className="job-details-aside-col">
            <div className="aside-card">
              <h3 className="aside-title">Job Overview</h3>
              <div className="overview-list">
                <div className="overview-row">
                  <span className="overview-label">Job Category</span>
                  <span className="overview-val">{job.category}</span>
                </div>
                <div className="overview-row">
                  <span className="overview-label">Employment Type</span>
                  <span className="overview-val">{job.jobType}</span>
                </div>
                <div className="overview-row">
                  <span className="overview-label">Experience</span>
                  <span className="overview-val">{job.experienceLevel}</span>
                </div>
                <div className="overview-row">
                  <span className="overview-label">Location</span>
                  <span className="overview-val">{job.location}</span>
                </div>
                <div className="overview-row">
                  <span className="overview-label">Compensation</span>
                  <span className="overview-val">{job.salary}</span>
                </div>
              </div>
            </div>

            <div className="aside-card highlight-card">
              <div className="security-icon-row">
                <ShieldCheck size={22} className="security-icon" />
                <h4 className="security-title">Safe Job Guarantee</h4>
              </div>
              <p className="security-text">
                JobFinder verifies recruiter profiles and guarantees 100% free applications with zero hidden agency costs.
              </p>
              <div className="sample-link-note">
                <span>Demo external application URL:</span>
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sample-external-link"
                >
                  <span>{job.applyUrl}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Demo Modal */}
      {showApplyModal && (
        <div className="modal-backdrop" onClick={closeApplyModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {hasAppliedSuccess ? (
              <div className="modal-success-state">
                <div className="success-icon-box">
                  <CheckCircle size={44} />
                </div>
                <h3 className="modal-success-title">Application Submitted!</h3>
                <p className="modal-success-desc">
                  Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been logged.
                  Your progress is saved to your <strong>Application Tracker</strong> as <em>Applied</em>.
                </p>
                <div className="demo-disclaimer-note">
                  * Note: This is an interactive portfolio demonstration. No real application email was sent to {job.company}.
                </div>
                <div className="modal-actions-row">
                  <button onClick={closeApplyModal} className="btn btn-outline">
                    Back to Details
                  </button>
                  <Link to="/tracker" onClick={closeApplyModal} className="btn btn-primary">
                    View in Application Tracker
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="apply-form">
                <h3 id="modal-title" className="apply-modal-title">
                  Apply for {job.title}
                </h3>
                <p className="apply-modal-company">{job.company} • {job.location}</p>

                <div className="form-group">
                  <label htmlFor="applicant-name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    id="applicant-name"
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="applicant-email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    id="applicant-email"
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="applicant-note" className="form-label">
                    Cover Note / Portfolio URL (Optional)
                  </label>
                  <textarea
                    id="applicant-note"
                    rows={3}
                    value={applicantResumeNote}
                    onChange={(e) => setApplicantResumeNote(e.target.value)}
                    placeholder="Briefly state why you are excited about this role..."
                    className="form-textarea"
                  />
                </div>

                <div className="modal-button-group">
                  <button type="button" onClick={closeApplyModal} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Send size={15} /> Submit Demo Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
