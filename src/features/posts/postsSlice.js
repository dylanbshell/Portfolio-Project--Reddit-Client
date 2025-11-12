import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts as apiFetchPosts } from '../../utils';

/**
 * Async thunk to fetch posts (replaces existing posts)
 * Use for initial load, subreddit change, or sort change
 */
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ subreddit = 'all', sort = 'best' }, { rejectWithValue }) => {
    try {
      const { posts, after } = await apiFetchPosts(subreddit, sort, 10);
      return { posts, after };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to load more posts (appends to existing posts)
 * Use for infinite scroll
 */
export const loadMorePosts = createAsyncThunk(
  'posts/loadMorePosts',
  async ({ subreddit = 'all', sort = 'best', after }, { rejectWithValue }) => {
    try {
      if (!after) {
        return rejectWithValue('No pagination cursor available');
      }

      const { posts, after: nextAfter } = await apiFetchPosts(subreddit, sort, 10, after);
      return { posts, after: nextAfter };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    loadMoreStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    loadMoreError: null,
    after: null, // Reddit pagination cursor
    hasMore: true
  },
  reducers: {
    /**
     * Clear all posts and reset state
     * Use when navigating away or starting fresh
     */
    clearPosts: (state) => {
      state.posts = [];
      state.status = 'idle';
      state.loadMoreStatus = 'idle';
      state.error = null;
      state.loadMoreError = null;
      state.after = null;
      state.hasMore = true;
    },

    /**
     * Clear error messages
     */
    clearErrors: (state) => {
      state.error = null;
      state.loadMoreError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts - Initial load or replace
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.loadMoreError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
        state.after = action.payload.after;
        state.hasMore = action.payload.after !== null;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load posts';
        state.posts = [];
        state.after = null;
        state.hasMore = false;
      })

      // loadMorePosts - Append to existing
      .addCase(loadMorePosts.pending, (state) => {
        state.loadMoreStatus = 'loading';
        state.loadMoreError = null;
      })
      .addCase(loadMorePosts.fulfilled, (state, action) => {
        state.loadMoreStatus = 'succeeded';
        state.posts = [...state.posts, ...action.payload.posts];
        state.after = action.payload.after;
        state.hasMore = action.payload.after !== null;
        state.loadMoreError = null;
      })
      .addCase(loadMorePosts.rejected, (state, action) => {
        state.loadMoreStatus = 'failed';
        state.loadMoreError = action.payload || 'Failed to load more posts';
        // Keep existing posts visible
      });
  }
});

// Export actions
export const { clearPosts, clearErrors } = postsSlice.actions;

// Selectors
export const selectPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectLoadMoreStatus = (state) => state.posts.loadMoreStatus;
export const selectPostsError = (state) => state.posts.error;
export const selectLoadMoreError = (state) => state.posts.loadMoreError;
export const selectHasMore = (state) => state.posts.hasMore;
export const selectAfter = (state) => state.posts.after;

// Combined selectors for convenience
export const selectPostsState = (state) => ({
  posts: state.posts.posts,
  status: state.posts.status,
  loadMoreStatus: state.posts.loadMoreStatus,
  error: state.posts.error,
  loadMoreError: state.posts.loadMoreError,
  hasMore: state.posts.hasMore,
  after: state.posts.after
});

export default postsSlice.reducer;
