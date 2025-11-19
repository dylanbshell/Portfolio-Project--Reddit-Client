import { Link } from 'react-router-dom';
import './Navigation.css';

/**
 * Navigation Component
 *
 * Main navigation bar for the Reddit Client application.
 * Features adaptive height based on context (standard: 65px, compact: 48px).
 *
 * @param {boolean} compact - If true, uses compact height (48px), otherwise standard (65px)
 * @param {React.ReactNode} searchBar - SearchBar component to be rendered in the nav
 */
function Navigation({ compact = false, searchBar = null }) {
  return (
    <nav className={`navigation ${compact ? 'navigation--compact' : ''}`}>
      <div className="navigation__container">
        {/* Logo Section */}
        <Link to="/" className="navigation__logo">
          <RedditIcon />
          <span className="navigation__logo-text">Reddit</span>
        </Link>

        {/* Search Bar Placeholder */}
        {searchBar && (
          <div className="navigation__search">
            {searchBar}
          </div>
        )}
      </div>
    </nav>
  );
}

/**
 * Reddit Icon SVG Component
 * Simple Reddit mascot (Snoo) icon
 */
function RedditIcon() {
  return (
    <svg
      className="navigation__icon"
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
