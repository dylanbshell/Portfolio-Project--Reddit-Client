/**
 * Utility functions index
 * Exports all utility functions for easy importing
 */

export {
  fetchPosts,
  fetchPopularSubreddits,
  searchPosts,
  searchCommunities,
  searchPeople,
  fetchPostWithComments,
  fetchSubredditAutocomplete,
  hasValidImage,
  getPostImageUrl,
  getPostCardType,
  clearCache
} from './redditApi.js';

export {
  getTimeAgo,
  formatCount,
  calculateVotes,
  truncateText,
  formatFullDate
} from './formatters.js';
