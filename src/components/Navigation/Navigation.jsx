import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

/**
 * Navigation Component
 *
 * Main navigation bar for the Reddit Client application.
 *
 * @param {boolean} compact - If true, uses compact height (48px), otherwise standard (65px)
 * @param {function} onSearch - Optional callback function when search is submitted
 */
function Navigation({ compact = false, onSearch }) {
  return (
    <nav className="w-full bg-bg-dark border-b border-border-accent flex items-center justify-between px-10 py-3">
      {/* Left side: Logo and Search */}
      <div className="flex items-center gap-8">
        {/* Home/Logo Button */}
        <Link
          to="/"
          className="flex items-center gap-4 text-white no-underline cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="bg-white p-1 rounded flex items-center justify-center">
            <RedditIcon />
          </div>
          <span className="font-primary text-lg font-bold leading-[23px] text-white">
            Reddit
          </span>
        </Link>

        {/* Search Bar */}
        <div className="min-w-[160px] max-w-[256px]">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
}

/**
 * Reddit Icon SVG Component
 * Reddit logo icon
 */
function RedditIcon() {
  return (
    <svg
      className="w-4 h-4 text-black flex-shrink-0"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" opacity="0.2"/>
      <circle cx="6" cy="7" r="1"/>
      <circle cx="10" cy="7" r="1"/>
      <path d="M8 11c-1.5 0-2.5-0.7-2.5-0.7s1 1.4 2.5 1.4 2.5-1.4 2.5-1.4-1 0.7-2.5 0.7z"/>
      <ellipse cx="8" cy="4.5" rx="1.5" ry="1"/>
    </svg>
  );
}

export default Navigation;
