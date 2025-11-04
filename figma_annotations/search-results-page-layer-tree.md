# Layer Tree Export: Selected Nodes
Exported on: 11/04/2025, 01:58:05 AM

---

└─ search-results-page
  📝 Desktop (>1024px):
  📝 Full layout with sidebar (if applicable) and main content area
  📝 Horizontal sub-sorting buttons
  📝 Search results cards in single column
  📝 Full layout with sidebar (if applicable) and main content area
  📝 Horizontal sub-sorting buttons
  📝 Search results cards in single column
  📝 Tablet (768px-1024px):
  📝 Maintain horizontal sub-sorting buttons (may reduce padding)
  📝 Cards adjust width to fill container
  📝 Maintain horizontal sub-sorting buttons (may reduce padding)
  📝 Cards adjust width to fill container
  📝 Mobile (<768px):
  📝 Stack all elements vertically
  📝 Full-width search bar
  📝 Full-width sorting tabs (Posts/Communities/People)
  📝 Dropdown menu for sub-sorting (replaces horizontal buttons)
  📝 Full-width search result cards
  📝 Reduce padding and font sizes for compact display
  📝 Stack all elements vertically
  📝 Full-width search bar
  📝 Full-width sorting tabs (Posts/Communities/People)
  📝 Dropdown menu for sub-sorting (replaces horizontal buttons)
  📝 Full-width search result cards
  📝 Reduce padding and font sizes for compact display
  📝 URL structure: /search?q={query}&sort={sortBy}&tab={activeTab}
  📝 On page load: Parse URL parameters and set initial Redux state
  📝 On state changes (new search, sort change, tab change): Update URL without full page reload
  📝 Browser back/forward buttons: Update Redux state to match URL parameters
  📝 Network errors: Display user-friendly error message with retry option
  📝 No results: Show empty state with suggestions
  📝 API rate limiting: Display message "Too many requests. Please wait a moment and try again."
  └─ search-results-background
    └─ search-results-container
      └─ nav-bar-container
        └─ home-button
          └─ reddit-icon-container
            └─ reddit-icon
              └─ Vector - 0
              └─ Depth 6, Frame 0
          └─ reddit-text-container
            └─ reddit
      └─ main-page-container
        📝 Initial page load: Fetch first 10 results from Reddit API based on URL parameters
        📝 Infinite scroll: When user scrolls near bottom of page, fetch next 10 results
        📝 API supports pagination via after parameter: /r/all/search.json?q={query}&sort={sortBy}&limit=10&after={lastPostId}
        📝 Redux searchSlice:results: Array of search result objects
        📝 hasMore: Boolean indicating if more results are available
        📝 after: String for pagination cursor (last item ID from previous fetch)
        📝 status: 'idle' | 'loading' | 'succeeded' | 'failed'
        📝 On scroll trigger: If hasMore is true and status is not 'loading', fetch next batch
        📝 Append new results to existing results array
        📝 Display error message if initial search fails: "Unable to load search results. Please try again."
        📝 Show error message if pagination fetch fails: "Unable to load more results."
        📝 Provide "Retry" button to re-attempt failed fetch
        📝 If no results returned: Display empty state message "No results found for '{query}'. Try a different search term."
        └─ search-results-panel-container
          └─ search-bar-section-container
            └─ search-bar-container
              └─ search-bar
                └─ search-bar-button
                  └─ search-bar-icon
                    └─ Vector - 0
                    └─ Depth 9, Frame 0
                └─ search-bar-input-field
                  📝 On submit (empty): Flash error message "Please enter a search term" for 2 seconds. 
                  📝 On submit (valid): Send query to Reddit API and update search results below. Note: Updates results in-place; does not navigate/reload page
                  📝 Search input field pre-fills with query parameter from URL (?q=search-term)
                  📝 Users can modify the search term and click the search button or press Enter to perform a new search
                  📝 Clicking search button or pressing Enter triggers new search with updated query
                  📝 On page load, extract q parameter from URL and populate search input field
                  📝 On search submission, dispatch Redux action to fetch new results from Reddit API: /r/all/search.json?q={query}&sort={sortBy}&limit=10
                  📝 Update URL with new query parameter without full page reload (React Router's navigate or useSearchParams)
                  📝 Redux searchSlice: Store current query, results array, active tab, and sort parameter
                  📝 On search submission, set status: 'loading', clear previous results
                  📝 On successful fetch, update results array and set status: 'succeeded'
                  └─ placeholder
          └─ sorting-bar-container
            📝 Three tabs: Posts (default/selected on page load), Communities, People
            📝 Clicking a tab switches the active tab and displays corresponding results
            📝 Active tab shows selection highlight (underline or background color per design)
            📝 Posts tab: Display search results with post cards (titles, thumbnails, vote counts, comments)
            📝 Communities tab: Display community cards (community name as title, blank information panel, community icon/thumbnail from API)
            📝 People tab: Display user cards (username as title, blank information panel, user avatar from API if available)
            📝 Redux searchSlice.activeTab: Track which tab is currently selected ('posts' | 'communities' | 'people')
            📝 Switching tabs updates activeTab in Redux
            📝 Each tab maintains its own results in separate arrays: postsResults, communitiesResults, peopleResults
            📝 If tab switch fails (e.g., click "Communities" tab but fetch fails): 
            📝 Display inline error below tabs: "Unable to load communities. Try again or switch to a different tab." 
            📝 Include small "Retry" link that re-fetches only that tab's data. 
            📝 Keep previous tab's results visible until new tab successfully loads. 
            📝 Set searchSlice.tabStatus['communities'] to 'failed'.
            └─ sorting-bar
              └─ posts-sorting-button (with selection highlight example)
                └─ posts-sorting-text-container
                  └─ posts
              └─ communities-sorting-button
                └─ communities-sorting-text-container
                  └─ communities
              └─ people-sorting-button
                └─ people-sorting-text-container
                  └─ people
          └─ sub-sorting-bar-title-container
            └─ sub-sorting-bar-title
          └─ sub-sorting-bar
            📝 Three sub-sorting buttons: Relevance (default), New, Top
            📝 Only visible and functional when Posts tab is active
            📝 Hide or disable sub-sorting bar when Communities or People tabs are selected
            📝 Active sub-sort button shows visual selection state (background color per design)
            📝 Clicking a sub-sort button triggers new API call with updated sort parameter
            📝 Reddit API endpoint: /r/all/search.json?q={query}&sort={relevance|new|top}&limit=10
            📝 Results update to reflect new sort order
            📝 Redux searchSlice.sortBy: Store current sort value ('relevance' | 'new' | 'top')
            📝 URL updates with sort parameter: /search?q={query}&sort={sortBy}
            📝 On sort change: set status: 'loading', fetch with new sort, update results
            📝 Mobile: Replace horizontal button group with dropdown menu button
            📝 Dropdown spans full width of screen below Posts/Communities/People tabs
            📝 Dropdown button follows same visual style as desktop sub-sorting buttons (background color, border-radius, typography)
            📝 Tapping dropdown reveals options: Relevance, New, Top
            📝 Selected option displays in dropdown button label
            └─ relevance-sub-sorting-button
              └─ relevance-sub-sorting-button-subcontainer
                └─ relevance-sub-sorting
            └─ new-sub-sorting-button
              └─ new-sub-sorting-button-subcontainer
                └─ new-sub-sorting
            └─ top-sorting-button
              └─ top-sub-sorting-button-subcontainer
                └─ top-sub-sorting
          └─ search-results-card
            📝 Posts: Clicking card opens post in modal overlay (same as Home Screen and Filtered View)
            📝 Communities: Clicking card navigates to Filtered View for that subreddit (/r/{subreddit})
            📝 People: Cards are unclickable for MVP (no cursor pointer, no hover state)
            📝 Hover state: Cards show hover styling (border-radius change or background color shift per design) except for People tab
            📝 Posts: Modal fetches post details and comments from /r/{subreddit}/comments/{postId}.json
            📝 Communities: Navigate to /r/{subreddit} route, trigger fetch of posts for that community
            📝 People: No action (disabled state)
            📝 Posts: Clicking card dispatches action to currentPostSlice to set active post, opens modal
            📝 Communities: React Router navigation to Filtered View route with subreddit parameter
            📝 People: No state changes
            └─ search-results-card-image
            └─ search-results-card-information
              └─ search-results-card-title
                └─ search-results-card-title
              └─ search-results-card-counts-container
                └─ comments-and-upvotes-count
              └─ search-results-card-information-container
                └─ community-name-and-username-and-elapsed-time
          └─ search-results-card (with hover example)
            └─ search-results-card-image
            └─ search-results-card-information
              └─ search-results-card-title
                └─ search-results-card-title
              └─ search-results-card-counts-container
                └─ comments-and-upvotes-count
              └─ search-results-card-information-container
                └─ community-name-and-username-and-elapsed-time
          └─ search-results-card
            └─ search-results-card-image
            └─ search-results-card-information
              └─ search-results-card-title
                └─ search-results-card-title
              └─ search-results-card-counts-container
                └─ comments-and-upvotes-count
              └─ search-results-card-information-container
                └─ community-name-and-username-and-elapsed-time
