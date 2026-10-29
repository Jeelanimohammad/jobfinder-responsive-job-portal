import React from "react";
import { Search, MapPin, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import "./SearchBar.css";

export default function SearchBar({ onSearchSubmit, placeholder = "Search by job title, company, or keywords..." }) {
  const { searchTerm, setSearchTerm, selectedLocation, setSelectedLocation } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <div className="search-input-field">
        <Search className="search-field-icon" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          aria-label="Search jobs"
          className="search-text-input"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear-btn"
            aria-label="Clear search input"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="search-divider-line" />

      <div className="search-location-field">
        <MapPin className="search-field-icon" size={20} />
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          aria-label="Filter by Location"
          className="search-location-select"
        >
          <option value="All">All Locations</option>
          <option value="Remote">Remote Only</option>
          <option value="Bengaluru, India">Bengaluru, India</option>
          <option value="San Francisco, CA">San Francisco, CA</option>
          <option value="New York, NY">New York, NY</option>
          <option value="London, UK">London, UK</option>
          <option value="Austin, TX">Austin, TX</option>
          <option value="Hyderabad, India">Hyderabad, India</option>
          <option value="Berlin, Germany">Berlin, Germany</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary search-submit-btn">
        <span>Find Jobs</span>
      </button>
    </form>
  );
}
