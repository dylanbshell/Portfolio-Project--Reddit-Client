import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchPosts as apiSearchPosts, searchCommunities as apiSearchCommunities, searchPeople as apiSearchPeople } from '../../utils';

/**
 * Async thunk to search posts
 * Replaces existing posts results
 */
export const performSearch = createAsyncThunk(
  'search/performSearch',
  async ({ query, sort = 'relevance' }, { rejectWithValue }) => {
    try {
      const { posts, after } = await apiSearchPosts(query, sort, 10);
      return { posts, after };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to load more posts (infinite scroll)
 */
export const loadMorePosts = createAsyncThunk(
  'search/loadMorePosts',
  async ({ query, sort = 'relevance', after }, { rejectWithValue }) => {
    try {
      if (!after) {
        return rejectWithValue('No pagination cursor available');
      }
      const { posts, after: nextAfter } = await apiSearchPosts(query, sort, 10, after);
      return { posts, after: nextAfter };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to search communities
 * Replaces existing communities results
 */
export const performSearchCommunities = createAsyncThunk(
  'search/performSearchCommunities',
  async ({ query }, { rejectWithValue }) => {
    try {
      const { communities, after } = await apiSearchCommunities(query, 10);
      return { communities, after };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to load more communities (infinite scroll)
 */
export const loadMoreCommunities = createAsyncThunk(
  'search/loadMoreCommunities',
  async ({ query, after }, { rejectWithValue }) => {
    try {
      if (!after) {
        return rejectWithValue('No pagination cursor available');
      }
      const { communities, after: nextAfter } = await apiSearchCommunities(query, 10, after);
      return { communities, after: nextAfter };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to search people/users
 * Replaces existing people results
 */
export const performSearchPeople = createAsyncThunk(
  'search/performSearchPeople',
  async ({ query }, { rejectWithValue }) => {
    try {
      const { users, after } = await apiSearchPeople(query, 10);
      return { users, after };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to load more people (infinite scroll)
 */
export const loadMorePeople = createAsyncThunk(
  'search/loadMorePeople',
  async ({ query, after }, { rejectWithValue }) => {
    try {
      if (!after) {
        return rejectWithValue('No pagination cursor available');
      }
      const { users, after: nextAfter } = await apiSearchPeople(query, 10, after);
      return { users, after: nextAfter };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    // Search parameters
    query: '',
    activeTab: 'posts', // 'posts' | 'communities' | 'people'
    sortBy: 'relevance', // 'relevance' | 'new' | 'top' (only for posts)

    // Posts tab state
    posts: {
      results: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      loadMoreStatus: 'idle',
      error: null,
      loadMoreError: null,
      after: null,
      hasMore: true
    },

    // Communities tab state
    communities: {
      results: [],
      status: 'idle',
      loadMoreStatus: 'idle',
      error: null,
      loadMoreError: null,
      after: null,
      hasMore: true
    },

    // People tab state
    people: {
      results: [],
      status: 'idle',
      loadMoreStatus: 'idle',
      error: null,
      loadMoreError: null,
      after: null,
      hasMore: true
    }
  },
  reducers: {
    /**
     * Set the search query
     */
    setQuery: (state, action) => {
      state.query = action.payload;
    },

    /**
     * Set the active tab
     */
    setActiveTab: (state, action) => {
      const validTabs = ['posts', 'communities', 'people'];
      if (validTabs.includes(action.payload)) {
        state.activeTab = action.payload;
      }
    },

    /**
     * Set the sort order (only affects posts tab)
     */
    setSortBy: (state, action) => {
      const validSorts = ['relevance', 'new', 'top'];
      if (validSorts.includes(action.payload)) {
        state.sortBy = action.payload;
      }
    },

    /**
     * Clear all search results and reset state
     */
    clearSearch: (state) => {
      state.query = '';
      state.activeTab = 'posts';
      state.sortBy = 'relevance';

      state.posts = {
        results: [],
        status: 'idle',
        loadMoreStatus: 'idle',
        error: null,
        loadMoreError: null,
        after: null,
        hasMore: true
      };

      state.communities = {
        results: [],
        status: 'idle',
        loadMoreStatus: 'idle',
        error: null,
        loadMoreError: null,
        after: null,
        hasMore: true
      };

      state.people = {
        results: [],
        status: 'idle',
        loadMoreStatus: 'idle',
        error: null,
        loadMoreError: null,
        after: null,
        hasMore: true
      };
    },

    /**
     * Clear errors for specific tab
     */
    clearTabErrors: (state, action) => {
      const tab = action.payload; // 'posts' | 'communities' | 'people'
      if (state[tab]) {
        state[tab].error = null;
        state[tab].loadMoreError = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // performSearch - Posts
      .addCase(performSearch.pending, (state) => {
        state.posts.status = 'loading';
        state.posts.error = null;
        state.posts.loadMoreError = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.posts.status = 'succeeded';
        state.posts.results = action.payload.posts;
        state.posts.after = action.payload.after;
        state.posts.hasMore = action.payload.after !== null;
        state.posts.error = null;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.posts.status = 'failed';
        state.posts.error = action.payload || 'Failed to search posts';
        state.posts.results = [];
        state.posts.after = null;
        state.posts.hasMore = false;
      })

      // loadMorePosts
      .addCase(loadMorePosts.pending, (state) => {
        state.posts.loadMoreStatus = 'loading';
        state.posts.loadMoreError = null;
      })
      .addCase(loadMorePosts.fulfilled, (state, action) => {
        state.posts.loadMoreStatus = 'succeeded';
        state.posts.results = [...state.posts.results, ...action.payload.posts];
        state.posts.after = action.payload.after;
        state.posts.hasMore = action.payload.after !== null;
        state.posts.loadMoreError = null;
      })
      .addCase(loadMorePosts.rejected, (state, action) => {
        state.posts.loadMoreStatus = 'failed';
        state.posts.loadMoreError = action.payload || 'Failed to load more posts';
      })

      // performSearchCommunities
      .addCase(performSearchCommunities.pending, (state) => {
        state.communities.status = 'loading';
        state.communities.error = null;
        state.communities.loadMoreError = null;
      })
      .addCase(performSearchCommunities.fulfilled, (state, action) => {
        state.communities.status = 'succeeded';
        state.communities.results = action.payload.communities;
        state.communities.after = action.payload.after;
        state.communities.hasMore = action.payload.after !== null;
        state.communities.error = null;
      })
      .addCase(performSearchCommunities.rejected, (state, action) => {
        state.communities.status = 'failed';
        state.communities.error = action.payload || 'Failed to search communities';
        state.communities.results = [];
        state.communities.after = null;
        state.communities.hasMore = false;
      })

      // loadMoreCommunities
      .addCase(loadMoreCommunities.pending, (state) => {
        state.communities.loadMoreStatus = 'loading';
        state.communities.loadMoreError = null;
      })
      .addCase(loadMoreCommunities.fulfilled, (state, action) => {
        state.communities.loadMoreStatus = 'succeeded';
        state.communities.results = [...state.communities.results, ...action.payload.communities];
        state.communities.after = action.payload.after;
        state.communities.hasMore = action.payload.after !== null;
        state.communities.loadMoreError = null;
      })
      .addCase(loadMoreCommunities.rejected, (state, action) => {
        state.communities.loadMoreStatus = 'failed';
        state.communities.loadMoreError = action.payload || 'Failed to load more communities';
      })

      // performSearchPeople
      .addCase(performSearchPeople.pending, (state) => {
        state.people.status = 'loading';
        state.people.error = null;
        state.people.loadMoreError = null;
      })
      .addCase(performSearchPeople.fulfilled, (state, action) => {
        state.people.status = 'succeeded';
        state.people.results = action.payload.users;
        state.people.after = action.payload.after;
        state.people.hasMore = action.payload.after !== null;
        state.people.error = null;
      })
      .addCase(performSearchPeople.rejected, (state, action) => {
        state.people.status = 'failed';
        state.people.error = action.payload || 'Failed to search people';
        state.people.results = [];
        state.people.after = null;
        state.people.hasMore = false;
      })

      // loadMorePeople
      .addCase(loadMorePeople.pending, (state) => {
        state.people.loadMoreStatus = 'loading';
        state.people.loadMoreError = null;
      })
      .addCase(loadMorePeople.fulfilled, (state, action) => {
        state.people.loadMoreStatus = 'succeeded';
        state.people.results = [...state.people.results, ...action.payload.users];
        state.people.after = action.payload.after;
        state.people.hasMore = action.payload.after !== null;
        state.people.loadMoreError = null;
      })
      .addCase(loadMorePeople.rejected, (state, action) => {
        state.people.loadMoreStatus = 'failed';
        state.people.loadMoreError = action.payload || 'Failed to load more people';
      });
  }
});

// Export actions
export const {
  setQuery,
  setActiveTab,
  setSortBy,
  clearSearch,
  clearTabErrors
} = searchSlice.actions;

// Selectors - General
export const selectQuery = (state) => state.search.query;
export const selectActiveTab = (state) => state.search.activeTab;
export const selectSortBy = (state) => state.search.sortBy;

// Selectors - Posts
export const selectPostsResults = (state) => state.search.posts.results;
export const selectPostsStatus = (state) => state.search.posts.status;
export const selectPostsLoadMoreStatus = (state) => state.search.posts.loadMoreStatus;
export const selectPostsError = (state) => state.search.posts.error;
export const selectPostsLoadMoreError = (state) => state.search.posts.loadMoreError;
export const selectPostsHasMore = (state) => state.search.posts.hasMore;
export const selectPostsAfter = (state) => state.search.posts.after;

// Selectors - Communities
export const selectCommunitiesResults = (state) => state.search.communities.results;
export const selectCommunitiesStatus = (state) => state.search.communities.status;
export const selectCommunitiesLoadMoreStatus = (state) => state.search.communities.loadMoreStatus;
export const selectCommunitiesError = (state) => state.search.communities.error;
export const selectCommunitiesLoadMoreError = (state) => state.search.communities.loadMoreError;
export const selectCommunitiesHasMore = (state) => state.search.communities.hasMore;
export const selectCommunitiesAfter = (state) => state.search.communities.after;

// Selectors - People
export const selectPeopleResults = (state) => state.search.people.results;
export const selectPeopleStatus = (state) => state.search.people.status;
export const selectPeopleLoadMoreStatus = (state) => state.search.people.loadMoreStatus;
export const selectPeopleError = (state) => state.search.people.error;
export const selectPeopleLoadMoreError = (state) => state.search.people.loadMoreError;
export const selectPeopleHasMore = (state) => state.search.people.hasMore;
export const selectPeopleAfter = (state) => state.search.people.after;

// Combined selectors for convenience
export const selectSearchState = (state) => ({
  query: state.search.query,
  activeTab: state.search.activeTab,
  sortBy: state.search.sortBy
});

export const selectActiveTabState = (state) => {
  const tab = state.search.activeTab;
  return state.search[tab];
};

export default searchSlice.reducer;
