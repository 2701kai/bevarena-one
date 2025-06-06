import PropTypes from "prop-types";
import React from "react";

/**
 * Molecule: SearchBar
 * Combines an input atom with a search icon.
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        🔍
      </span>
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: "Search...",
};
