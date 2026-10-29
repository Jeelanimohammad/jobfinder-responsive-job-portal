import React, { createContext, useContext, useState, useEffect } from "react";
import { SAMPLE_JOBS } from "../data/jobsData";

const AppContext = createContext();

const SAVED_JOBS_KEY = "jobfinder_saved_jobs_v1";
const TRACKED_JOBS_KEY = "jobfinder_tracked_jobs_v1";

export function AppProvider({ children }) {
  // Saved job IDs: Array of string IDs
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const stored = localStorage.getItem(SAVED_JOBS_KEY);
      return stored ? JSON.parse(stored) : ["job-1", "job-2"]; // seeded with 2 favorites
    } catch (e) {
      console.error("Failed to load saved jobs from localStorage", e);
      return ["job-1", "job-2"];
    }
  });

  // Tracked status dictionary: { [jobId]: { status: "Interested" | "Applied" | "Interviewing" | "Offered" | "Rejected", updatedAt: string, notes?: string } }
  const [applicationStatuses, setApplicationStatuses] = useState(() => {
    try {
      const stored = localStorage.getItem(TRACKED_JOBS_KEY);
      return stored ? JSON.parse(stored) : {
        "job-1": { status: "Interested", updatedAt: new Date().toLocaleDateString(), notes: "Bookmarked for next week" },
        "job-2": { status: "Applied", updatedAt: new Date().toLocaleDateString(), notes: "Sent portfolio and resume" }
      };
    } catch (e) {
      console.error("Failed to load application statuses from localStorage", e);
      return {};
    }
  });

  // Global search filters state for easy handoff between Home and Jobs pages
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobIds));
    } catch (e) {
      console.error("Could not persist saved jobs", e);
    }
  }, [savedJobIds]);

  useEffect(() => {
    try {
      localStorage.setItem(TRACKED_JOBS_KEY, JSON.stringify(applicationStatuses));
    } catch (e) {
      console.error("Could not persist application statuses", e);
    }
  }, [applicationStatuses]);

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      if (exists) {
        showToast("Job removed from saved list");
        return prev.filter((id) => id !== jobId);
      } else {
        showToast("Job saved to your bookmarks");
        return [...prev, jobId];
      }
    });
  };

  const isJobSaved = (jobId) => savedJobIds.includes(jobId);

  const updateApplicationStatus = (jobId, status, notes = "") => {
    setApplicationStatuses((prev) => {
      if (!status || status === "None") {
        const copy = { ...prev };
        delete copy[jobId];
        showToast("Tracking status cleared for this job");
        return copy;
      }
      showToast(`Job application marked as "${status}"`);
      return {
        ...prev,
        [jobId]: {
          status,
          updatedAt: new Date().toLocaleDateString(),
          notes: notes || (prev[jobId]?.notes || "")
        }
      };
    });
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedJobType("All");
    setSelectedExperience("All");
    setSelectedLocation("All");
    setSortBy("default");
    showToast("Filters reset to default");
  };

  return (
    <AppContext.Provider
      value={{
        jobs: SAMPLE_JOBS,
        savedJobIds,
        toggleSaveJob,
        isJobSaved,
        applicationStatuses,
        updateApplicationStatus,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedJobType,
        setSelectedJobType,
        selectedExperience,
        setSelectedExperience,
        selectedLocation,
        setSelectedLocation,
        sortBy,
        setSortBy,
        clearAllFilters,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
