import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { useApp } from "../context/AppContext";
import { JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS, LOCATIONS } from "../data/jobsData";
import "./FilterPanel.css";

export default function FilterPanel() {
  const {
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
    clearAllFilters
  } = useApp();

  const hasActiveFilters =
    selectedCategory !== "All Categories" ||
    selectedJobType !== "All" ||
    selectedExperience !== "All" ||
    selectedLocation !== "All" ||
    sortBy !== "default";

  return (
    <aside className="filter-panel" aria-label="Job filters">
      <div className="filter-header">
        <div className="filter-title-group">
          <Filter size={18} className="filter-title-icon" />
          <h3 className="filter-main-heading">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="filter-reset-btn"
            title="Reset all filters"
          >
            <RotateCcw size={13} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Sort By Filter */}
      <div className="filter-section">
        <label htmlFor="sort-select" className="filter-section-title">
          Sort By
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="default">Featured & Latest</option>
          <option value="title-asc">Job Title (A to Z)</option>
          <option value="title-desc">Job Title (Z to A)</option>
          <option value="company-asc">Company (A to Z)</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <label htmlFor="category-select" className="filter-section-title">
          Job Category
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          {JOB_CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type Filter */}
      <div className="filter-section">
        <span className="filter-section-title">Job Type</span>
        <div className="filter-radio-group">
          {JOB_TYPES.map((type) => (
            <label key={type} className="filter-radio-label">
              <input
                type="radio"
                name="jobType"
                value={type}
                checked={selectedJobType === type}
                onChange={() => setSelectedJobType(type)}
                className="filter-radio-input"
              />
              <span className="filter-radio-custom" />
              <span className="filter-radio-text">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level Filter */}
      <div className="filter-section">
        <span className="filter-section-title">Experience Level</span>
        <div className="filter-pill-group">
          {EXPERIENCE_LEVELS.map((exp) => (
            <button
              key={exp}
              type="button"
              className={`filter-pill ${selectedExperience === exp ? "active" : ""}`}
              onClick={() => setSelectedExperience(exp)}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="filter-section">
        <label htmlFor="location-select" className="filter-section-title">
          Location
        </label>
        <select
          id="location-select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="filter-select"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
