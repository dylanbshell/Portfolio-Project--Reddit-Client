/**
 * Reddit API Helper Functions
 * Provides utilities for fetching data from the Reddit JSON API
 */

const REDDIT_BASE_URL = 'https://www.reddit.com';
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simple in-memory cache
const cache = new Map();

/**
 * Cache utility functions
 */
const cacheUtils = {
  get(key) {
    const item = cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() > item.expiry;
    if (isExpired) {
      cache.delete(key);
      return null;
    }

    return item.data;
  },

  set(key, data, duration = CACHE_DURATION) {
    cache.set(key, {
      data,
      expiry: Date.now() + duration
    });
  },

  clear() {
    cache.clear();
  }
};

/**
 * Fetch with timeout wrapper
 * @param {string} url - The URL to fetch
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, timeout = DEFAULT_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
}

/**
 * Base Reddit API fetch function with caching
 * @param {string} endpoint - Reddit API endpoint (e.g., '/r/all/best.json')
 * @param {boolean} useCache - Whether to use cached response
 * @returns {Promise<any>}
 */
async function fetchFromReddit(endpoint, useCache = true) {
  const url = `${REDDIT_BASE_URL}${endpoint}`;

  // Check cache first
  if (useCache) {
    const cachedData = cacheUtils.get(url);
    if (cachedData) {
      return cachedData;
    }
  }

  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();

    // Cache the response
    if (useCache) {
      cacheUtils.set(url, data);
    }

    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
}

/**
 * Parse Reddit post data and extract relevant fields
 * @param {object} post - Raw post data from Reddit API
 * @returns {object} - Cleaned post object
 */
function parsePost(post) {
  const data = post.data;

  return {
    id: data.id,
    title: data.title,
    author: data.author,
    subreddit: data.subreddit,
    subredditPrefixed: data.subreddit_name_prefixed, // e.g., "r/technology"
    score: data.score,
    upvoteRatio: data.upvote_ratio,
    numComments: data.num_comments,
    createdUtc: data.created_utc,
    permalink: data.permalink,
    url: data.url,
    selftext: data.selftext,
    thumbnail: data.thumbnail,
    preview: data.preview,
    postHint: data.post_hint, // 'image', 'link', 'self', etc.
    isVideo: data.is_video,
    domain: data.domain
  };
}

/**
 * Parse Reddit comment data recursively (max 2 levels)
 * @param {object} comment - Raw comment data from Reddit API
 * @param {number} depth - Current nesting depth
 * @returns {object|null} - Cleaned comment object or null if max depth exceeded
 */
function parseComment(comment, depth = 0) {
  // Skip "more" comments placeholder
  if (comment.kind === 'more') {
    return null;
  }

  const data = comment.data;

  const parsed = {
    id: data.id,
    author: data.author,
    body: data.body,
    score: data.score,
    createdUtc: data.created_utc,
    replies: []
  };

  // Parse replies (only up to depth 1, so max 2 levels total)
  if (depth < 1 && data.replies && data.replies.data && data.replies.data.children) {
    parsed.replies = data.replies.data.children
      .map(reply => parseComment(reply, depth + 1))
      .filter(reply => reply !== null);
  }

  // Add count of hidden deeper replies
  if (depth === 1 && data.replies && data.replies.data && data.replies.data.children) {
    parsed.moreRepliesCount = data.replies.data.children.length;
  }

  return parsed;
}

/**
 * Fetch posts from r/all or a specific subreddit
 * @param {string} subreddit - Subreddit name (default: 'all')
 * @param {string} sort - Sort type: 'best', 'hot', 'new', 'top', 'rising'
 * @param {number} limit - Number of posts to fetch
 * @param {string} after - Pagination cursor
 * @returns {Promise<{posts: Array, after: string|null}>}
 */
export async function fetchPosts(subreddit = 'all', sort = 'best', limit = 10, after = null) {
  let endpoint = `/r/${subreddit}/${sort}.json?limit=${limit}`;
  if (after) {
    endpoint += `&after=${after}`;
  }

  const data = await fetchFromReddit(endpoint);

  return {
    posts: data.data.children.map(parsePost),
    after: data.data.after || null
  };
}

/**
 * Fetch popular subreddits for sidebar
 * @param {number} limit - Number of subreddits to fetch
 * @returns {Promise<Array>}
 */
export async function fetchPopularSubreddits(limit = 20) {
  const endpoint = `/subreddits/popular.json?limit=${limit}`;
  const data = await fetchFromReddit(endpoint);

  return data.data.children.map(subreddit => ({
    id: subreddit.data.id,
    name: subreddit.data.display_name,
    displayNamePrefixed: subreddit.data.display_name_prefixed,
    iconImg: subreddit.data.icon_img || subreddit.data.community_icon || null,
    subscribers: subreddit.data.subscribers,
    publicDescription: subreddit.data.public_description
  }));
}

/**
 * Search Reddit posts
 * @param {string} query - Search query
 * @param {string} sort - Sort type: 'relevance', 'new', 'top'
 * @param {number} limit - Number of results
 * @param {string} after - Pagination cursor
 * @returns {Promise<{posts: Array, after: string|null}>}
 */
export async function searchPosts(query, sort = 'relevance', limit = 10, after = null) {
  if (!query || query.trim() === '') {
    throw new Error('Search query cannot be empty');
  }

  let endpoint = `/r/all/search.json?q=${encodeURIComponent(query)}&sort=${sort}&limit=${limit}`;
  if (after) {
    endpoint += `&after=${after}`;
  }

  const data = await fetchFromReddit(endpoint, false); // Don't cache search results

  return {
    posts: data.data.children.map(parsePost),
    after: data.data.after || null
  };
}

/**
 * Search Reddit communities/subreddits
 * @param {string} query - Search query
 * @param {number} limit - Number of results
 * @param {string} after - Pagination cursor
 * @returns {Promise<{communities: Array, after: string|null}>}
 */
export async function searchCommunities(query, limit = 10, after = null) {
  if (!query || query.trim() === '') {
    throw new Error('Search query cannot be empty');
  }

  let endpoint = `/subreddits/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
  if (after) {
    endpoint += `&after=${after}`;
  }

  const data = await fetchFromReddit(endpoint, false); // Don't cache search results

  return {
    communities: data.data.children.map(subreddit => ({
      id: subreddit.data.id,
      name: subreddit.data.display_name,
      displayNamePrefixed: subreddit.data.display_name_prefixed,
      iconImg: subreddit.data.icon_img || subreddit.data.community_icon || null,
      subscribers: subreddit.data.subscribers,
      publicDescription: subreddit.data.public_description
    })),
    after: data.data.after || null
  };
}

/**
 * Search Reddit users/people
 * @param {string} query - Search query
 * @param {number} limit - Number of results
 * @param {string} after - Pagination cursor
 * @returns {Promise<{users: Array, after: string|null}>}
 */
export async function searchPeople(query, limit = 10, after = null) {
  if (!query || query.trim() === '') {
    throw new Error('Search query cannot be empty');
  }

  let endpoint = `/users/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
  if (after) {
    endpoint += `&after=${after}`;
  }

  const data = await fetchFromReddit(endpoint, false); // Don't cache search results

  return {
    users: data.data.children.map(user => ({
      id: user.data.id,
      name: user.data.name,
      iconImg: user.data.icon_img || null,
      linkKarma: user.data.link_karma,
      commentKarma: user.data.comment_karma
    })),
    after: data.data.after || null
  };
}

/**
 * Fetch post details with comments
 * @param {string} subreddit - Subreddit name
 * @param {string} postId - Post ID
 * @returns {Promise<{post: object, comments: Array}>}
 */
export async function fetchPostWithComments(subreddit, postId) {
  const endpoint = `/r/${subreddit}/comments/${postId}.json`;
  const data = await fetchFromReddit(endpoint, false); // Don't cache post details

  // Reddit API returns [post_data, comments_data]
  const postData = data[0].data.children[0];
  const commentsData = data[1].data.children;

  return {
    post: parsePost(postData),
    comments: commentsData
      .map(comment => parseComment(comment))
      .filter(comment => comment !== null)
  };
}

/**
 * Fetch autocomplete suggestions for subreddits
 * @param {string} query - Search query
 * @returns {Promise<Array>}
 */
export async function fetchSubredditAutocomplete(query) {
  if (!query || query.trim() === '') {
    return [];
  }

  try {
    const endpoint = `/subreddits/search.json?q=${encodeURIComponent(query)}&limit=5`;
    const data = await fetchFromReddit(endpoint, false);

    return data.data.children.map(subreddit => ({
      name: subreddit.data.display_name,
      displayNamePrefixed: subreddit.data.display_name_prefixed,
      subscribers: subreddit.data.subscribers
    }));
  } catch (error) {
    // Silently fail for autocomplete
    console.error('Autocomplete error:', error);
    return [];
  }
}

/**
 * Check if a post has a valid image
 * @param {object} post - Parsed post object
 * @returns {boolean}
 */
export function hasValidImage(post) {
  // Check if post_hint indicates an image
  if (post.postHint === 'image') {
    return true;
  }

  // Check if there's a valid preview
  if (post.preview && post.preview.images && post.preview.images.length > 0) {
    return true;
  }

  // Check thumbnail (but exclude default thumbnails)
  const invalidThumbnails = ['self', 'default', 'nsfw', 'spoiler', ''];
  if (post.thumbnail && !invalidThumbnails.includes(post.thumbnail)) {
    return true;
  }

  return false;
}

/**
 * Get the best image URL from a post
 * @param {object} post - Parsed post object
 * @returns {string|null}
 */
export function getPostImageUrl(post) {
  // Try to get high-quality image from preview
  if (post.preview && post.preview.images && post.preview.images.length > 0) {
    const image = post.preview.images[0];

    // Get the highest resolution available
    if (image.resolutions && image.resolutions.length > 0) {
      const highRes = image.resolutions[image.resolutions.length - 1];
      return highRes.url.replace(/&amp;/g, '&'); // Decode HTML entities
    }

    // Fallback to source
    if (image.source && image.source.url) {
      return image.source.url.replace(/&amp;/g, '&');
    }
  }

  // Fallback to thumbnail if valid
  const invalidThumbnails = ['self', 'default', 'nsfw', 'spoiler', ''];
  if (post.thumbnail && !invalidThumbnails.includes(post.thumbnail)) {
    return post.thumbnail;
  }

  // Try the URL directly if it's an image
  if (post.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(post.url)) {
    return post.url;
  }

  return null;
}

/**
 * Determine post card type
 * @param {object} post - Parsed post object
 * @returns {'image'|'text'}
 */
export function getPostCardType(post) {
  return hasValidImage(post) ? 'image' : 'text';
}

/**
 * Clear the API cache
 */
export function clearCache() {
  cacheUtils.clear();
}

export default {
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
};
