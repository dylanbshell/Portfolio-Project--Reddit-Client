# Layer Tree Export: Selected Nodes
Exported on: 11/04/2025, 01:59:16 AM

---

└─ filtered-view-page
  📝 Route pattern: /r/:subreddit
  📝 Extract subreddit from URL using React Router useParams() hook
  📝 Example: /r/technology → subreddit = "technology"
  📝 On mount: 
  📝 Extract subreddit from URL params
  📝 Update Redux with active subreddit
  📝 Fetch posts for that subreddit with default sort="best" (Endpoint: GET /r/{subreddit}/{sort}.json?limit=10)
  📝 Redux filterSlice: - activeSubreddit (string from URL) - sortOrder (string: 'best' | 'hot' | 'new' | 'top' | 'rising')
  📝 Redux postsSlice: posts array, loading, error, hasMore
  📝 Same as home screen
  📝 Load 10 more posts when user scrolls near bottom
  📝 Maintain current sort order when loading more
  📝 If subreddit doesn't exist (404): 
  📝 Display centered message: "r/{subreddit} not found. This community may not exist or may have been removed." 
  📝 Include "Back to Home" button (navigate to /). 
  📝 Set filterSlice.error to '404'. 
  📝 No retry option (permanent failure).
  └─ filtered-view-background
    └─ filtered-view-container
      └─ nav-bar-container
        └─ nav-controls
          └─ home-button
            └─ reddit-icon-container
              └─ reddit-icon
                └─ Vector - 0
                └─ Depth 6, Frame 0
            └─ reddit-text-container
              └─ reddit
          └─ search-bar-container
            └─ search-bar
              └─ search-button
                └─ search-button-icon
                  └─ Vector - 0
                  └─ Depth 8, Frame 0
              └─ search-input-field
                └─ placeholder
      └─ main-page-container
        └─ sidebar-container
          📝 Read activeSubreddit from Redux filterSlice
          📝 Compare each community name with activeSubreddit
          📝 If match: Apply selected state styling (see below)
          📝 SELECTED COMMUNITY STATE: - Width: 272px (17rem) - Height: 56px (3.5rem) - Padding: 0 16px (0 1rem) - Gap: 16px (1rem) - Border-radius: 21px (1.3125rem) - Background: #3B2B26
          📝 Same click behavior as home screen
          📝 Navigate to /r/{subreddit}
          📝 Selected state updates based on URL change
          └─ sidebar-title-container
            └─ sidebar-title
          └─ community-container (with current community selection highlight)
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
          └─ community-container
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
          └─ community-container
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
          └─ community-container
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
          └─ community-container
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
          └─ community-container
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
          └─ community-container
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
          └─ community-container
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
          └─ community-container
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
          └─ community-container
            └─ community-icon-container
              └─ community-icon
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
        └─ main-feed-container
          📝 Fetch posts from: GET /r/{subreddit}/{sort}.json?limit=10
          📝 When sort changes: REPLACE all posts (don't append)
          📝 Show loading state during fetch
          📝 Infinite scroll: Append more posts with same sort parameter
          📝 Same logic as home screen
          📝 ImagePostCard if image asset available
          📝 TextPostCard otherwise
          📝 If filtered posts fetch fails: Display centered error message: 
          📝 "Unable to load posts from r/{subreddit}. Please try again." with "Retry" button. 
          📝 Retry re-fetches from /r/{subreddit}.json?sort={sortOrder}. 
          📝 Set filterSlice.status to 'failed'. 
          📝 Keep sidebar visible so users can select different community.
          📝 If "load more posts" fails during infinite scroll: 
          📝 Display error banner at bottom of feed: "Couldn't load more posts" with "Try again" link. 
          📝 Keep existing posts visible and allow interaction. 
          📝 Don't block user from changing sort options or selecting different community.
          └─ sorting-bar-container
            📝 SORT OPTIONS: - Best (default) - Hot - New - Top - Rising
            📝 Click sort button:
            📝 Update Redux sortOrder state
            📝 Update URL: /r/{subreddit}?sort={sortOrder}
            📝 Clear existing posts
            📝 Fetch new posts with selected sort parameter
            📝 Reset infinite scroll (hasMore = true)
            📝 On initial load: "Best" is selected
            📝 Selected button has visual highlight
            📝 Redux filterSlice: sortOrder
            📝 Update sortOrder on button click
            📝 Trigger new API call in useEffect when sortOrder changes
            └─ sorting-bar
              📝 Desktop: Standard flex row, all buttons visible
              📝 Mobile:
              📝 Display: flex with overflow-x: scroll
              📝 Enable horizontal scrolling
              📝 Snap-scroll optional for better UX
              └─ best-sorting-button-container (with selection highlight example)
                📝 Click: Set as active sort, fetch posts, update URL
                📝 DEFAULT (UNSELECTED) STATE: - Padding: 16px 0 - Color: #BAA39C (secondary text color) - No border-bottom - Box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)
                📝 SELECTED STATE: - Padding: 16px 0 13px 0 - Border-bottom: 3px solid #E5E8EB - Color: #FFFFFF (primary text) - Box-shadow: none - Display: flex - Flex-direction: column - Justify-content: center - Align-items: center
                📝 Desktop/Tablet: All buttons visible in row
                📝 Mobile (<768px):
                📝 Horizontal scroll container 
                📝 Overflow-x: scroll
                📝 Allow swiping between sort options
                └─ best-sorting-button
                  └─ best-sorting-button
              └─ hot-sorting-button-container
                └─ hot-sorting-button
                  └─ hot-sorting-button
              └─ new-sorting-button-container
                └─ new-sorting-button
                  └─ new-sorting-button
              └─ top-sorting-button-container
                └─ top-sorting-button
                  └─ top-sorting-button
              └─ rising-sorting-button-container
                └─ rising-sorting-button
                  └─ rising-sorting-button
          └─ image-post-card-container
            └─ image-post-card
              └─ post-info
                └─ post-title
                  └─ post-title
                └─ image-post-card-username
                  └─ image-post-card-username
                └─ spacer
                └─ post-stats
                  └─ image-post-card-count
                    └─ upvote-downvote-comment-count
              └─ post-image
          └─ main-feed-spacer
          └─ image-post-card-container (with hover example)
            └─ image-post-card
              └─ post-info
                └─ post-title
                  └─ post-title
                └─ image-post-card-username
                  └─ image-post-card-username
                └─ spacer
                └─ post-stats
                  └─ image-post-card-count
                    └─ upvote-downvote-comment-count
              └─ post-image
          └─ main-feed-spacer
          └─ text-post-card-container (with hover highlight example)
            └─ text-post-card
              └─ post-info
                └─ text-post-card-title
                  └─ post-title
                └─ text-post-card-username
                  └─ text-post-card-username
                └─ text-post-card-count-container
                  └─ upvote-count-container
                    └─ upvote-count-icon-container
                      └─ upvote-count-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ upvote-group
                      └─ upvote-count
                  └─ downvote-count-container
                    └─ downvote-count-icon-container
                      └─ downvote-count-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ downvote-group
                      └─ downvote-count
                  └─ comment-count-container
                    └─ comment-count-icon-container
                      └─ comment-count-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ comment-group
                      └─ comment-count
              └─ post-card-content-container
                └─ post-content
          └─ main-feed-spacer
          └─ image-post-card-container
            └─ image-post-card
              └─ post-info
                └─ post-title
                  └─ post-title
                └─ image-post-card-username
                  └─ image-post-card-username
                └─ spacer
                └─ post-stats
                  └─ image-post-card-count
                    └─ upvote-downvote-comment-count
              └─ post-image
          └─ main-feed-spacer
          └─ text-post-card-container
            └─ text-post-card
              └─ post-info
                └─ text-post-card-title
                  └─ post-title
                └─ text-post-card-username
                  └─ text-post-card-username
                └─ text-post-card-count-container
                  └─ upvote-count-container
                    └─ upvote-count-icon-container
                      └─ upvote-count-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ upvote-group
                      └─ upvote-count
                  └─ downvote-count-container
                    └─ downvote-count-icon-container
                      └─ downvote-count-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ downvote-group
                      └─ downvote-count
                  └─ comment-count-container
                    └─ comment-count-icon-container
                      └─ comment-count-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ comment-group
                      └─ comment-count
              └─ post-card-content-container
                └─ post-content
