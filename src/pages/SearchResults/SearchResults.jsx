import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchResultCard from '../../components/SearchResultCard';
import {
  setQuery,
  setActiveTab,
  setSortBy,
  performSearch,
  performSearchCommunities,
  performSearchPeople,
  selectQuery,
  selectActiveTab,
  selectSortBy,
  selectPostsResults,
  selectPostsStatus,
  selectPostsError,
  selectCommunitiesResults,
  selectCommunitiesStatus,
  selectCommunitiesError,
  selectPeopleResults,
  selectPeopleStatus,
  selectPeopleError
} from '../../features/search/searchSlice';

// Search icon
const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-text-secondary"
  >
    <path
      d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * SearchResults Page Component
 * Displays search results with tabs for Posts, Communities, and People
 */
export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const query = useSelector(selectQuery);
  const activeTab = useSelector(selectActiveTab);
  const sortBy = useSelector(selectSortBy);

  // Results and status for each tab
  const postsResults = useSelector(selectPostsResults);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

  const communitiesResults = useSelector(selectCommunitiesResults);
  const communitiesStatus = useSelector(selectCommunitiesStatus);
  const communitiesError = useSelector(selectCommunitiesError);

  const peopleResults = useSelector(selectPeopleResults);
  const peopleStatus = useSelector(selectPeopleStatus);
  const peopleError = useSelector(selectPeopleError);

  // Local search input state
  const [searchInput, setSearchInput] = useState('');

  // Sync URL params with Redux on mount and URL changes
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    const urlTab = searchParams.get('tab') || 'posts';
    const urlSort = searchParams.get('sort') || 'relevance';

    // Update Redux if URL has different values
    if (urlQuery !== query) {
      dispatch(setQuery(urlQuery));
      setSearchInput(urlQuery);
    }

    if (urlTab !== activeTab) {
      dispatch(setActiveTab(urlTab));
    }

    if (urlSort !== sortBy) {
      dispatch(setSortBy(urlSort));
    }

    // Perform search if we have a query
    if (urlQuery) {
      if (urlTab === 'posts' && postsStatus === 'idle') {
        dispatch(performSearch({ query: urlQuery, sort: urlSort }));
      } else if (urlTab === 'communities' && communitiesStatus === 'idle') {
        dispatch(performSearchCommunities({ query: urlQuery }));
      } else if (urlTab === 'people' && peopleStatus === 'idle') {
        dispatch(performSearchPeople({ query: urlQuery }));
      }
    }
  }, [searchParams]);

  // Update URL when Redux state changes
  const updateURL = (newQuery, newTab, newSort) => {
    const params = {};
    if (newQuery) params.q = newQuery;
    if (newTab) params.tab = newTab;
    if (newTab === 'posts' && newSort) params.sort = newSort;

    setSearchParams(params);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchInput || searchInput.trim().length === 0) {
      return;
    }

    // Update Redux and URL
    dispatch(setQuery(searchInput));
    updateURL(searchInput, activeTab, sortBy);

    // Perform search based on active tab
    if (activeTab === 'posts') {
      dispatch(performSearch({ query: searchInput, sort: sortBy }));
    } else if (activeTab === 'communities') {
      dispatch(performSearchCommunities({ query: searchInput }));
    } else if (activeTab === 'people') {
      dispatch(performSearchPeople({ query: searchInput }));
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
    updateURL(query, tab, sortBy);

    // Fetch results for new tab if needed
    if (query) {
      if (tab === 'posts') {
        dispatch(performSearch({ query, sort: sortBy }));
      } else if (tab === 'communities') {
        dispatch(performSearchCommunities({ query }));
      } else if (tab === 'people') {
        dispatch(performSearchPeople({ query }));
      }
    }
  };

  // Handle sort change (only for posts)
  const handleSortChange = (sort) => {
    dispatch(setSortBy(sort));
    updateURL(query, activeTab, sort);

    if (query) {
      dispatch(performSearch({ query, sort }));
    }
  };

  // Get current results and status based on active tab
  const getCurrentResults = () => {
    switch (activeTab) {
      case 'posts':
        return postsResults;
      case 'communities':
        return communitiesResults;
      case 'people':
        return peopleResults;
      default:
        return [];
    }
  };

  const getCurrentStatus = () => {
    switch (activeTab) {
      case 'posts':
        return postsStatus;
      case 'communities':
        return communitiesStatus;
      case 'people':
        return peopleStatus;
      default:
        return 'idle';
    }
  };

  const getCurrentError = () => {
    switch (activeTab) {
      case 'posts':
        return postsError;
      case 'communities':
        return communitiesError;
      case 'people':
        return peopleError;
      default:
        return null;
    }
  };

  const currentResults = getCurrentResults();
  const currentStatus = getCurrentStatus();
  const currentError = getCurrentError();

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Search Panel */}
      <div className="flex justify-center px-[160px] py-5">
        <div className="w-full max-w-[960px]">
          {/* Search Bar */}
          <div className="px-4 py-3">
            <form onSubmit={handleSearch}>
              <div className="flex items-stretch h-12 rounded-lg overflow-hidden">
                {/* Search Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center bg-bg-primary px-4 rounded-l-lg hover:opacity-80 transition-opacity"
                  aria-label="Search"
                >
                  <SearchIcon />
                </button>

                {/* Search Input */}
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search"
                  className="flex-1 bg-bg-primary text-white placeholder-text-secondary px-2 pr-4 rounded-r-lg outline-none focus:ring-2 focus:ring-border-primary font-primary text-base leading-6"
                  aria-label="Search input"
                />
              </div>
            </form>
          </div>

          {/* Tabs */}
          <div className="border-b border-border-primary pb-3">
            <div className="flex items-start gap-8 px-4">
              {/* Posts Tab */}
              <button
                onClick={() => handleTabChange('posts')}
                className={`flex flex-col items-center justify-center px-0 py-4 ${
                  activeTab === 'posts'
                    ? 'border-b-[3px] border-border-accent'
                    : ''
                }`}
              >
                <span
                  className={`font-primary text-sm font-bold leading-[21px] ${
                    activeTab === 'posts' ? 'text-white' : 'text-text-secondary'
                  }`}
                >
                  Posts
                </span>
              </button>

              {/* Communities Tab */}
              <button
                onClick={() => handleTabChange('communities')}
                className={`flex flex-col items-center justify-center px-0 py-4 ${
                  activeTab === 'communities'
                    ? 'border-b-[3px] border-border-accent'
                    : ''
                }`}
              >
                <span
                  className={`font-primary text-sm font-bold leading-[21px] ${
                    activeTab === 'communities'
                      ? 'text-white'
                      : 'text-text-secondary'
                  }`}
                >
                  Communities
                </span>
              </button>

              {/* People Tab */}
              <button
                onClick={() => handleTabChange('people')}
                className={`flex flex-col items-center justify-center px-0 py-4 ${
                  activeTab === 'people'
                    ? 'border-b-[3px] border-border-accent'
                    : ''
                }`}
              >
                <span
                  className={`font-primary text-sm font-bold leading-[21px] ${
                    activeTab === 'people' ? 'text-white' : 'text-text-secondary'
                  }`}
                >
                  People
                </span>
              </button>
            </div>
          </div>

          {/* Sort Section - Only visible for Posts tab */}
          {activeTab === 'posts' && (
            <>
              <div className="px-4 pt-4 pb-2">
                <h2 className="font-primary text-lg font-bold leading-[23px] text-white">
                  Sort
                </h2>
              </div>

              <div className="flex flex-wrap items-start gap-3 px-3 py-3">
                {/* Relevance */}
                <button
                  onClick={() => handleSortChange('relevance')}
                  className={`h-8 px-4 rounded-lg font-primary text-sm font-medium leading-[21px] text-white transition-opacity ${
                    sortBy === 'relevance'
                      ? 'bg-bg-primary'
                      : 'bg-bg-primary opacity-60 hover:opacity-80'
                  }`}
                >
                  Relevance
                </button>

                {/* New */}
                <button
                  onClick={() => handleSortChange('new')}
                  className={`h-8 px-4 rounded-lg font-primary text-sm font-medium leading-[21px] text-white transition-opacity ${
                    sortBy === 'new'
                      ? 'bg-bg-primary'
                      : 'bg-bg-primary opacity-60 hover:opacity-80'
                  }`}
                >
                  New
                </button>

                {/* Top */}
                <button
                  onClick={() => handleSortChange('top')}
                  className={`h-8 px-4 rounded-lg font-primary text-sm font-medium leading-[21px] text-white transition-opacity ${
                    sortBy === 'top'
                      ? 'bg-bg-primary'
                      : 'bg-bg-primary opacity-60 hover:opacity-80'
                  }`}
                >
                  Top
                </button>
              </div>
            </>
          )}

          {/* Results Area */}
          <div className="mt-4">
            {/* Empty State */}
            {!query && (
              <div className="flex justify-center items-center h-64">
                <p className="text-text-secondary text-center">
                  Enter a search term to get started
                </p>
              </div>
            )}

            {/* Loading State */}
            {query && currentStatus === 'loading' && (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
                  <p className="text-text-secondary">Searching...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {query && currentStatus === 'failed' && (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <p className="text-red-500 mb-4">{currentError}</p>
                  <button
                    onClick={() => handleTabChange(activeTab)}
                    className="bg-bg-primary text-white px-6 py-2 rounded-lg hover:opacity-80 transition-opacity"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Results */}
            {query && currentStatus === 'succeeded' && (
              <>
                {currentResults.length === 0 ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-text-secondary text-center">
                      No results found for "{query}". Try a different search term.
                    </p>
                  </div>
                ) : (
                  <div>
                    {currentResults.map((result) => (
                      <SearchResultCard
                        key={result.id}
                        result={result}
                        type={activeTab}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
