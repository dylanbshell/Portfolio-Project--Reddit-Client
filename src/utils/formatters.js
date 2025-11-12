/**
 * Utility functions for formatting data
 */

/**
 * Convert Unix timestamp to relative time string
 * @param {number} unixTimestamp - Unix timestamp in seconds
 * @returns {string} - Relative time string (e.g., "2h", "3d", "1mo")
 */
export function getTimeAgo(unixTimestamp) {
  const now = Date.now();
  const timestamp = unixTimestamp * 1000; // Convert to milliseconds
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  // Years
  if (diffInSeconds >= intervals.year) {
    const years = Math.floor(diffInSeconds / intervals.year);
    return `${years}y`;
  }

  // Months
  if (diffInSeconds >= intervals.month) {
    const months = Math.floor(diffInSeconds / intervals.month);
    return `${months}mo`;
  }

  // Weeks
  if (diffInSeconds >= intervals.week) {
    const weeks = Math.floor(diffInSeconds / intervals.week);
    return `${weeks}w`;
  }

  // Days
  if (diffInSeconds >= intervals.day) {
    const days = Math.floor(diffInSeconds / intervals.day);
    return `${days}d`;
  }

  // Hours
  if (diffInSeconds >= intervals.hour) {
    const hours = Math.floor(diffInSeconds / intervals.hour);
    return `${hours}h`;
  }

  // Minutes
  if (diffInSeconds >= intervals.minute) {
    const minutes = Math.floor(diffInSeconds / intervals.minute);
    return `${minutes}m`;
  }

  // Just now
  return 'just now';
}

/**
 * Format large numbers with K/M suffixes
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string (e.g., "1.2k", "3.5M")
 */
export function formatCount(num) {
  if (typeof num !== 'number') {
    return '0';
  }

  if (num < 0) {
    return `-${formatCount(Math.abs(num))}`;
  }

  // Less than 1000, return as is
  if (num < 1000) {
    return num.toString();
  }

  // Thousands (1k - 999.9k)
  if (num < 1000000) {
    const thousands = num / 1000;
    // Only show decimal if it's not a whole number
    return thousands % 1 === 0
      ? `${Math.floor(thousands)}k`
      : `${thousands.toFixed(1)}k`;
  }

  // Millions (1M+)
  const millions = num / 1000000;
  return millions % 1 === 0
    ? `${Math.floor(millions)}M`
    : `${millions.toFixed(1)}M`;
}

/**
 * Calculate downvotes from score and upvote ratio
 * Note: Reddit API doesn't provide exact upvote/downvote counts anymore,
 * this is an approximation based on score and upvote_ratio
 *
 * @param {number} score - Post/comment score
 * @param {number} upvoteRatio - Upvote ratio (0-1)
 * @returns {object} - {upvotes, downvotes}
 */
export function calculateVotes(score, upvoteRatio = 0.5) {
  if (upvoteRatio === 0.5) {
    // When ratio is exactly 0.5, upvotes and downvotes are equal
    const upvotes = Math.abs(score);
    const downvotes = Math.abs(score);
    return { upvotes, downvotes };
  }

  if (upvoteRatio === 1) {
    // All upvotes, no downvotes
    return { upvotes: score, downvotes: 0 };
  }

  if (upvoteRatio === 0) {
    // All downvotes, no upvotes
    return { upvotes: 0, downvotes: Math.abs(score) };
  }

  // Calculate based on formula:
  // score = upvotes - downvotes
  // upvoteRatio = upvotes / (upvotes + downvotes)
  const upvotes = Math.round(score / (2 * upvoteRatio - 1));
  const downvotes = upvotes - score;

  return {
    upvotes: Math.max(0, upvotes),
    downvotes: Math.max(0, downvotes)
  };
}

/**
 * Truncate text to a maximum length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string}
 */
export function truncateText(text, maxLength = 300) {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Format full date for accessibility or tooltips
 * @param {number} unixTimestamp - Unix timestamp in seconds
 * @returns {string} - Full formatted date (e.g., "January 15, 2024 at 3:45 PM")
 */
export function formatFullDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export default {
  getTimeAgo,
  formatCount,
  calculateVotes,
  truncateText,
  formatFullDate
};
