import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

/**
 * Navigation Component
 *
 * Main navigation bar for the Reddit Client application.
 * Features adaptive height based on context (standard: 65px, compact: 48px).
 *
 * @param {boolean} compact - If true, uses compact height (48px), otherwise standard (65px)
 * @param {function} onSearch - Optional callback function when search is submitted
 */
function Navigation({ compact = false, onSearch }) {
  return (
    <nav className={`w-full ${compact ? 'h-nav-compact' : 'h-nav sm:h-14'} bg-bg-transparent flex items-center justify-center px-base md:px-padding-lg lg:px-10 py-md transition-[height] duration-300 ease`}>
      <div className="w-full max-w-container flex items-center justify-between gap-md md:gap-base lg:gap-lg">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-sm text-text-primary no-underline cursor-pointer transition-opacity duration-200 flex-shrink-0 hover:opacity-80"
        >
          <RedditIcon compact={compact} />
          <span className={`font-primary ${compact ? 'text-base sm:text-xs' : 'text-sm sm:text-base md:text-lg'} font-bold leading-relaxed text-text-primary hidden xs:inline`}>
            Reddit
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 flex justify-end max-w-full sm:max-w-[400px] md:max-w-[600px]">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
}

/**
 * Reddit Icon SVG Component
 * Simple Reddit mascot (Snoo) icon
 */
function RedditIcon({ compact }) {
  return (
    <svg
      className={`${compact ? 'w-7 h-7 sm:w-5 sm:h-5' : 'w-6 h-6 sm:w-8 sm:h-8'} text-text-primary flex-shrink-0`}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" opacity="0.2"/>
      <circle cx="9" cy="11" r="1.5"/>
      <circle cx="15" cy="11" r="1.5"/>
      <path d="M12 16c-2 0-3.5-1-3.5-1s1.5 2 3.5 2 3.5-2 3.5-2-1.5 1-3.5 1z"/>
      <ellipse cx="12" cy="7" rx="2" ry="1.5"/>
    </svg>
  );
}

export default Navigation;
