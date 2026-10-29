import React, { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import JobList from "../components/JobList";
import { useApp } from "../context/AppContext";
import { Briefcase, RotateCcw } from "lucide-react";
import "./Jobs.css";

export default function Jobs() {
  const {
    jobs,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedJobType,
    setSelectedJobType,
    selectedExperience,
    selectedLocation,
    setSelectedLocation,

    sortBy,
    clearAllFilters
  } = useApp();

  const [searchParams] = useSearchParams();

  // Listen to query params on mount if directed from Home or tags
  useEffect(() => {
    const q = searchParams.get("q");
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const location = searchParams.get("location");

    if (q) setSearchTerm(q);
    if (category) setSelectedCategory(category);
    if (type) setSelectedJobType(type);
    if (location) setSelectedLocation(location);
  }, [searchParams, setSearchTerm, setSelectedCategory, setSelectedJobType, setSelectedLocation]);


  // Combined search and filtering logic
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search query match (title, company, description, skills)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter((job) => {
        return (
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term) ||
          job.skills?.some((s) => s.toLowerCase().includes(term))
        );
      });
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      result = result.filter((job) => job.category === selectedCategory);
    }

    // Job Type filter
    if (selectedJobType && selectedJobType !== "All") {
      result = result.filter((job) => job.jobType === selectedJobType);
    }

    // Experience Level filter
    if (selectedExperience && selectedExperience !== "All") {
      result = result.filter((job) => job.experienceLevel === selectedExperience);
    }

    // Location filter
    if (selectedLocation && selectedLocation !== "All") {
      if (selectedLocation === "Remote") {
        result = result.filter((job) => job.location.toLowerCase().includes("remote"));
      } else {
        result = result.filter((job) => job.location.toLowerCase().includes(selectedLocation.toLowerCase()));
      }
    }

    // Sorting
    if (sortBy === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "company-asc") {
      result.sort((a, b) => a.company.localeCompare(b.company));
    } else {
      // default: featured first, then original order
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [jobs, searchTerm, selectedCategory, selectedJobType, selectedExperience, selectedLocation, sortBy]);

  return (
    <div className="jobs-page-wrapper">
      {/* Header Search Area */}
      <div className="jobs-header-banner">
        <div className="container">
          <div className="jobs-banner-content">
            <h1 className="jobs-banner-title">Find Your Next Big Career Move</h1>
            <p className="jobs-banner-subtitle">
              Browse {jobs.length} curated opportunities across frontend, fullstack, design, DevOps, and cloud technologies.
            </p>
            <div className="jobs-search-container">
              <SearchBar placeholder="Search by job title, company name, or tech stack..." />
            </div>
          </div>
        </div>
      </div>

      <div className="container jobs-layout-container">
        {/* Results Bar */}
        <div className="jobs-results-header">
          <div className="results-count-group">
            <Briefcase size={18} className="results-count-icon" />
            <span className="results-count-text">
              Showing <strong>{filteredJobs.length}</strong> of {jobs.length} jobs
            </span>
          </div>

          {(searchTerm || selectedCategory !== "All Categories" || selectedJobType !== "All" || selectedExperience !== "All" || selectedLocation !== "All") && (
            <button onClick={clearAllFilters} className="clear-active-filters-btn">
              <RotateCcw size={13} /> Clear filters
            </button>
          )}
        </div>

        {/* 2-Column Layout: Sidebar Filters + Main Results */}
        <div className="jobs-grid-layout">
          <div className="jobs-sidebar-col">
            <FilterPanel />
          </div>

          <main className="jobs-content-col">
            <JobList
              jobs={filteredJobs}
              emptyTitle="No matching job listings found"
              emptySubtitle="Try tweaking your search term, clearing location preferences, or adjusting the experience filters to see more listings."
            />
          </main>
        </div>
      </div>
    </div>
  );
}
