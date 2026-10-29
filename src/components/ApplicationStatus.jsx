import React, { useState } from "react";
import { CheckCircle2, ChevronDown, Clock, XCircle, Heart, Award } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ApplicationStatus({ jobId, compact = false }) {
  const { applicationStatuses, updateApplicationStatus } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const currentInfo = applicationStatuses[jobId] || { status: "None" };
  const currentStatus = currentInfo.status;

  const STATUS_OPTIONS = [
    { value: "Interested", label: "Interested", icon: Heart, badgeClass: "badge-secondary" },
    { value: "Applied", label: "Applied", icon: CheckCircle2, badgeClass: "badge-primary" },
    { value: "Interviewing", label: "Interviewing", icon: Clock, badgeClass: "badge-warning" },
    { value: "Offered", label: "Offer Received", icon: Award, badgeClass: "badge-accent" },
    { value: "Rejected", label: "Not Selected", icon: XCircle, badgeClass: "badge-danger" },
    { value: "None", label: "No Status (Clear)", icon: null, badgeClass: "badge-neutral" }
  ];

  const currentOpt = STATUS_OPTIONS.find((opt) => opt.value === currentStatus) || STATUS_OPTIONS[STATUS_OPTIONS.length - 1];
  const IconComponent = currentOpt.icon;

  const handleSelect = (statusVal) => {
    updateApplicationStatus(jobId, statusVal);
    setIsOpen(false);
  };

  return (
    <div className={`app-status-control ${compact ? "compact" : ""}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
      <button
        type="button"
        className={`status-trigger-btn badge ${currentOpt.badgeClass}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        title="Change application progress"
      >
        {IconComponent && <IconComponent size={13} />}
        <span>{currentStatus === "None" ? "+ Track Status" : currentOpt.label}</span>
        <ChevronDown size={12} className={`chevron-indicator ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="status-dropdown-menu">
          <div className="status-dropdown-header">Application Stage</div>
          {STATUS_OPTIONS.map((opt) => {
            const OptIcon = opt.icon;
            const isSelected = currentStatus === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`status-dropdown-item ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(opt.value)}
              >
                {OptIcon ? <OptIcon size={14} className="dropdown-item-icon" /> : <span className="dropdown-icon-spacer" />}
                <span className="dropdown-item-text">{opt.label}</span>
                {isSelected && <span className="active-dot">•</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
