import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, selectQuery } from '../../features/search/searchSlice';

// Search icon SVG component
const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-text-secondary"
  >
    <path
      d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));

    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!query || query.trim().length === 0) {
      setErrorMessage('Please enter a search term');

      // Clear error after 2 seconds
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);

      return;
    }

    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="flex items-stretch h-10 rounded-lg overflow-hidden">
          {/* Search Button */}
          <button
            type="submit"
            className="flex items-center justify-center bg-bg-primary px-4 rounded-l-lg hover:opacity-80 transition-opacity"
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          {/* Search Input Field */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search"
            className="flex-1 bg-bg-primary text-text-primary placeholder-text-secondary px-2 pr-4 rounded-r-lg outline-none focus:ring-2 focus:ring-border-primary font-secondary text-base leading-6"
            aria-label="Search input"
          />
        </div>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div className="absolute top-full left-0 mt-2 w-full bg-red-600 text-text-primary text-sm px-3 py-2 rounded-lg shadow-lg z-10">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
