import { createSlice } from '@reduxjs/toolkit';

/**
 * Filter slice manages the current filter state for the filtered view
 * - activeSubreddit: which subreddit is being viewed (null = home/r/all)
 * - sortOrder: current sort order (best, hot, new, top, rising)
 * - error: error state for handling 404s or other issues
 */
const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    activeSubreddit: null, // null for home, string for filtered view (e.g., "technology")
    sortOrder: 'best', // 'best' | 'hot' | 'new' | 'top' | 'rising'
    error: null
  },
  reducers: {
    /**
     * Set the active subreddit
     * @param {string|null} payload - Subreddit name or null for home
     */
    setActiveSubreddit: (state, action) => {
      state.activeSubreddit = action.payload;
      state.error = null; // Clear error when changing subreddit
    },

    /**
     * Set the sort order
     * @param {string} payload - Sort order: 'best' | 'hot' | 'new' | 'top' | 'rising'
     */
    setSortOrder: (state, action) => {
      const validSorts = ['best', 'hot', 'new', 'top', 'rising'];
      if (validSorts.includes(action.payload)) {
        state.sortOrder = action.payload;
      }
    },

    /**
     * Set error state (e.g., '404' for subreddit not found)
     * @param {string|null} payload - Error message
     */
    setFilterError: (state, action) => {
      state.error = action.payload;
    },

    /**
     * Clear error state
     */
    clearFilterError: (state) => {
      state.error = null;
    },

    /**
     * Clear all filters and reset to defaults
     * Use when navigating back to home
     */
    clearFilter: (state) => {
      state.activeSubreddit = null;
      state.sortOrder = 'best';
      state.error = null;
    }
  }
});

// Export actions
export const {
  setActiveSubreddit,
  setSortOrder,
  setFilterError,
  clearFilterError,
  clearFilter
} = filterSlice.actions;

// Selectors
export const selectActiveSubreddit = (state) => state.filter.activeSubreddit;
export const selectSortOrder = (state) => state.filter.sortOrder;
export const selectFilterError = (state) => state.filter.error;

// Combined selector for convenience
export const selectFilterState = (state) => ({
  activeSubreddit: state.filter.activeSubreddit,
  sortOrder: state.filter.sortOrder,
  error: state.filter.error
});

// Helper selectors
export const selectIsFiltered = (state) => state.filter.activeSubreddit !== null;
export const selectCurrentSubreddit = (state) => state.filter.activeSubreddit || 'all';

export default filterSlice.reducer;
