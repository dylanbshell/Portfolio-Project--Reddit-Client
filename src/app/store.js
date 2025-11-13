import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import postsReducer from '../features/posts/postsSlice';
import communitiesReducer from '../features/communities/communitiesSlice';
import filterReducer from '../features/filter/filterSlice';
import searchReducer from '../features/search/searchSlice';
import currentPostReducer from '../features/currentPost/currentPostSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    communities: communitiesReducer,
    filter: filterReducer,
    search: searchReducer,
    currentPost: currentPostReducer,
  },
});
