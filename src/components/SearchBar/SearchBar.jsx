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
    className="text-[#baa39c]"
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
    <div className="relative w-40 h-10">
      <form onSubmit={handleSubmit} className="relative w-full h-full">
        <div className="flex items-stretch h-full rounded-lg overflow-hidden">
          {/* Search Button */}
          <button
            type="submit"
            className="flex items-center justify-center bg-[#3b2b26] px-4 rounded-l-lg hover:bg-[#4a3a35] transition-colors"
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
            className="flex-1 bg-[#3b2b26] text-white placeholder-[#baa39c] px-2 pr-4 rounded-r-lg outline-none focus:ring-2 focus:ring-[#54403b] font-['Inter'] text-base"
            aria-label="Search input"
          />
        </div>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div className="absolute top-full left-0 mt-2 w-full bg-red-600 text-white text-sm px-3 py-2 rounded shadow-lg z-10">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
