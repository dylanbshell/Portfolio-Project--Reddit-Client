import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularSubreddits } from '../../utils';

/**
 * Async thunk to fetch popular communities/subreddits
 * Fetches the top 20 popular subreddits from Reddit
 */
export const fetchCommunities = createAsyncThunk(
  'communities/fetchCommunities',
  async (_, { rejectWithValue }) => {
    try {
      const communities = await fetchPopularSubreddits(20);
      return communities;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const communitiesSlice = createSlice({
  name: 'communities',
  initialState: {
    communities: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    /**
     * Clear error message
     */
    clearCommunitiesError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.communities = action.payload;
        state.error = null;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load communities';
        state.communities = [];
      });
  }
});

// Export actions
export const { clearCommunitiesError } = communitiesSlice.actions;

// Selectors
export const selectCommunities = (state) => state.communities.communities;
export const selectCommunitiesStatus = (state) => state.communities.status;
export const selectCommunitiesError = (state) => state.communities.error;

// Combined selector for convenience
export const selectCommunitiesState = (state) => ({
  communities: state.communities.communities,
  status: state.communities.status,
  error: state.communities.error
});

export default communitiesSlice.reducer;
