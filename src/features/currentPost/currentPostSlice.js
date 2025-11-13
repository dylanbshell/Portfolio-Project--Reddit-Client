import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostWithComments } from '../../utils';

/**
 * Async thunk to fetch a post with its comments
 * Fetches both post data and comments in a single API call
 */
export const fetchPost = createAsyncThunk(
  'currentPost/fetchPost',
  async ({ subreddit, postId }, { rejectWithValue }) => {
    try {
      const { post, comments } = await fetchPostWithComments(subreddit, postId);
      return { post, comments };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const COMMENTS_PER_PAGE = 50;

const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState: {
    post: null,
    comments: [], // All comments fetched from API
    displayedCommentsCount: COMMENTS_PER_PAGE, // How many comments to display
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    /**
     * Load more comments for display (increment display count)
     * Used for infinite scroll - shows next batch of already-fetched comments
     */
    loadMoreCommentsForDisplay: (state) => {
      const remainingComments = state.comments.length - state.displayedCommentsCount;
      if (remainingComments > 0) {
        state.displayedCommentsCount = Math.min(
          state.displayedCommentsCount + COMMENTS_PER_PAGE,
          state.comments.length
        );
      }
    },

    /**
     * Clear the current post and reset state
     * Use when closing the modal or navigating away
     */
    clearCurrentPost: (state) => {
      state.post = null;
      state.comments = [];
      state.displayedCommentsCount = COMMENTS_PER_PAGE;
      state.status = 'idle';
      state.error = null;
    },

    /**
     * Clear error state
     */
    clearCurrentPostError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = action.payload.post;
        state.comments = action.payload.comments;
        state.displayedCommentsCount = COMMENTS_PER_PAGE; // Reset to show first batch
        state.error = null;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load post';
        state.post = null;
        state.comments = [];
        state.displayedCommentsCount = COMMENTS_PER_PAGE;
      });
  }
});

// Export actions
export const {
  loadMoreCommentsForDisplay,
  clearCurrentPost,
  clearCurrentPostError
} = currentPostSlice.actions;

// Selectors
export const selectCurrentPost = (state) => state.currentPost.post;
export const selectAllComments = (state) => state.currentPost.comments;
export const selectDisplayedCommentsCount = (state) => state.currentPost.displayedCommentsCount;
export const selectCurrentPostStatus = (state) => state.currentPost.status;
export const selectCurrentPostError = (state) => state.currentPost.error;

// Derived selectors
/**
 * Get the comments that should be displayed (based on displayedCommentsCount)
 */
export const selectDisplayedComments = (state) => {
  const { comments, displayedCommentsCount } = state.currentPost;
  return comments.slice(0, displayedCommentsCount);
};

/**
 * Check if there are more comments to display
 */
export const selectHasMoreCommentsToDisplay = (state) => {
  const { comments, displayedCommentsCount } = state.currentPost;
  return displayedCommentsCount < comments.length;
};

/**
 * Get the total number of comments (all fetched)
 */
export const selectTotalCommentsCount = (state) => state.currentPost.comments.length;

// Combined selector for convenience
export const selectCurrentPostState = (state) => ({
  post: state.currentPost.post,
  comments: selectDisplayedComments(state),
  allCommentsCount: state.currentPost.comments.length,
  displayedCount: state.currentPost.displayedCommentsCount,
  hasMore: selectHasMoreCommentsToDisplay(state),
  status: state.currentPost.status,
  error: state.currentPost.error
});

export default currentPostSlice.reducer;
