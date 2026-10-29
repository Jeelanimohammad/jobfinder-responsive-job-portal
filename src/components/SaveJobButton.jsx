import React from "react";
import { Bookmark } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function SaveJobButton({ jobId, size = 18, showLabel = false, className = "" }) {
  const { isJobSaved, toggleSaveJob } = useApp();
  const saved = isJobSaved(jobId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaveJob(jobId);
      }}
      className={`save-job-btn ${saved ? "is-saved" : ""} ${className}`}
      aria-label={saved ? "Remove from saved jobs" : "Save this job"}
      title={saved ? "Remove from saved jobs" : "Save this job"}
    >
      <Bookmark
        size={size}
        className="bookmark-icon"
        fill={saved ? "currentColor" : "none"}
      />
      {showLabel && <span>{saved ? "Saved" : "Save Job"}</span>}
    </button>
  );
}
