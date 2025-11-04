# Layer Tree Export: Selected Nodes
Exported on: 11/04/2025, 02:00:03 AM

---

└─ home-screen-page
  └─ home-screen-background
    └─ home-screen-container
      └─ nav-bar-container
        └─ nav-controls
          └─ home-button
            📝 Click: Navigate to home screen (route: "/" or "/home")
            📝 If already on home page: Refresh the page
            📝 Hover: Add subtle drop shadow effect
            └─ reddit-icon-container
              └─ reddit-icon
                └─ Vector - 0
                └─ Depth 6, Frame 0
            └─ reddit-text-container
              └─ reddit
          └─ search-bar-container
            📝 On focus: Animate to screen center and expand to 20% viewport width
            📝 Input: Allow text entry, show autocomplete suggestions for popular subreddits
            📝 Submit (Enter key or search button click): Navigate to /search?q={query} 
            📝 Validation: Must contain at least 1 character (cannot be blank) 
            📝 Empty submission: Flash error message "Please enter a search term" for 2 seconds
            📝 Autocomplete: Display dropdown with popular subreddit suggestions as user types
            📝 Local state:
            📝 searchQuery (controlled input)
            📝 showAutocomplete (boolean)
            📝 autocompleteSuggestions (array)
            📝 errorMessage (string or null)
            📝 Desktop/Tablet: Full search bar visible
            📝 Mobile (<768px): Collapse to search icon only
            📝 Click icon: Expand to full screen width
            📝 Click outside or submit: Collapse back to icon
            📝 Fetch autocomplete suggestions from Reddit API as user types (debounced)
            📝 On submit: Navigate to /search with query param, SearchResults page handles data fetching
            📝 Empty input validation: Show error toast/message for 2 seconds
            📝 API failure for autocomplete: Silently fail, allow search anyway
            └─ search-bar
              └─ search-button
                └─ search-button-icon
                  └─ Vector - 0
                  └─ Depth 8, Frame 0
              └─ search-input-field
                └─ placeholder
      └─ main-page-container
        └─ sidebar-container
          📝 On mount: Fetch top/most popular subreddits from Reddit API
          📝 Endpoint: GET /subreddits/popular.json (or similar)
          📝 Display list of communities with icons and names
          📝 Redux: communities (array of subreddit objects)
          📝 Redux: loading status, error state
          📝 Local state: Not needed (all in Redux)
          📝 Sidebar scrolls independently from main content
          📝 Fixed width, vertical scroll when content exceeds viewport height
          📝 Desktop/Tablet: Visible sidebar on left
          📝 Mobile (<768px): Collapse to hamburger menu icon
          📝 Click hamburger: Open slide-out/modal with scrollable community list
          📝 Click outside or select community: Close menu
          └─ sidebar-title-container
            └─ sidebar-title
          └─ community-container
            📝 Click: Navigate to filtered view page (route: /r/{subreddit_name})
            📝 Hover: Apply hover state styles (see below)
            📝 Selection: Does NOT persist on navigation back (no "active" state on home screen)
            📝 HOVER STATE: - Width: 17rem (272px) - Height: 3.5rem (56px) - Padding: 0 1rem - Border-radius: 1.3125rem (21px) - Background: #3B2B26 - Display: flex, align-items: center, gap: 1rem
            📝 Display subreddit icon (fetched dynamically from API)
            📝 Display subreddit name
            └─ community-icon-container
              └─ community-icon
                📝 Source: Subreddit icon URL from Reddit API
                📝 Fallback: Display placeholder icon if icon_img is null/empty
                📝 Size: 40px × 40px (from design tokens)
                📝 Border-radius: 8px
                └─ Vector - 0
                └─ Depth 7, Frame 0
            └─ community-title-button-container
              └─ community-title-button
                📝 Click: Same behavior as parent community-container
                📝 Text: Display subreddit display_name or name from API
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
          └─ community-container (with hover highlight example)
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
          📝 On mount: Fetch "best" posts from r/all
          📝 Endpoint: GET /r/all/best.json?limit=10 - Infinite scroll: Load 10 more posts when user scrolls near bottom
          📝 Append new posts to existing posts array
          📝 If API provides image asset (and it's not just an icon): Render ImagePostCard
          📝 Otherwise: Render TextPostCard
          📝 Check: post.preview or post.url for valid image URLs
          📝 Redux: posts (array), loading status, error state, hasMore (boolean)
          📝 Local state: Not needed for posts data
          📝 Implement infinite scroll
          📝 Trigger next page load when user reaches ~80% of current content
          📝 Show loading spinner while fetching more posts
          📝 If initial post fetch fails, replace feed with centered error message: "Unable to load posts. Please check your connection and try again." 
          📝 Include a "Retry" button that re-fetches posts. 
          📝 Set Redux postsSlice.status to 'failed' and postsSlice.error to error message.
          📝 If "load more posts" fails during infinite scroll: 
          📝 Display error banner at bottom of feed: "Couldn't load more posts" with small "Try again" link. 
          📝 Keep existing posts visible. 
          📝 Don't block user from scrolling/interacting with loaded content. 
          📝 Log error to console.
          └─ main-feed-title-container
            └─ main-feed-title
              └─ main-feed-title
          └─ main-feed-spacer
          └─ image-post-card-container
            └─ image-post-card
              └─ post-info
                └─ post-header
                  └─ post-title
                    └─ post-title
                  └─ subreddit
                    └─ subreddit
                └─ post-stats
                  └─ image-post-card-count
                    └─ upvotes-downvotes-comments-count
              └─ post-image
          └─ main-feed-spacer
          └─ image-post-card-container (with hover highlight example)
            📝 Click anywhere on card: Open post detail view in modal (route: /post/{post_id})
            📝 Click subreddit name: Navigate to filtered view (route: /r/{subreddit})
            📝 Hover: Apply hover gradient effect (see below)
            📝 HOVER STATE:
            📝 Padding: 16px - Border-radius: 35px (2.1875rem) - Background: linear-gradient(130deg, #171212 55.96%, #413333 116.73%) - Transition: Smooth hover effect
            📝 Desktop: Standard layout with image on right, info on left 
            📝 Mobile (<768px):
            📝 Expand to full screen width
            📝 Stack vertically: Title/subreddit/stats on top, image below
            📝 Image scales to fit container width
            └─ image-post-card
              └─ post-info
                └─ post-header
                  📝 Post title: Part of clickable card area
                  📝 Subreddit name: Separate clickable link to /r/{subreddit}
                  └─ post-title
                    └─ post-title
                  └─ subreddit
                    └─ subreddit
                └─ post-stats
                  📝 Display only (read-only, no voting functionality)
                  📝 Show: upvotes, downvotes, comment count
                  └─ image-post-card-count
                    └─ upvotes-downvotes-comments-count
              └─ post-image
                📝 If image fails to load (broken thumbnail URL or 404): 
                📝 Display placeholder image with Reddit logo or light gray background. 
                📝 Use onError event handler: <img onError={(e) => e.target.src = fallbackImage} />. -
                📝 Never show broken image icon.
          └─ main-feed-spacer
          └─ text-post-card-container
            └─ text-post-card
              └─ post-info
                └─ text-post-card-title
                  └─ text-post-card-title
                └─ text-post-card-community
                  └─ text-post-card-community
                └─ text-post-count-container
                  └─ text-post-card-upvote-count-container
                    └─ upvote-icon
                      └─ upvote-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ upvote-count
                      └─ upvote-count
                  └─ text-post-card-downvote-count-container
                    └─ downvote-icon
                      └─ downvote-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ downvote-count
                      └─ downvote-count
                  └─ text-post-card-comment-count-container
                    └─ comment-icon
                      └─ Depth 7, Frame 0
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ comment-count
                      └─ comment-count
              └─ post-card-content-container
                └─ post-content
          └─ main-feed-spacer
          └─ image-post-card-container
            └─ image-post-card
              └─ post-info
                └─ post-header
                  └─ post-title
                    └─ post-title
                  └─ subreddit
                    └─ subreddit
                └─ post-stats
                  └─ image-post-card-count
                    └─ upvotes-downvotes-comments-count
              └─ post-image
          └─ main-feed-spacer
          └─ image-post-card-container
            └─ image-post-card
              └─ post-info
                └─ post-header
                  └─ post-title
                    └─ post-title
                  └─ subreddit
                    └─ subreddit
                └─ post-stats
                  └─ image-post-card-count
                    └─ upvotes-downvotes-comments-count
              └─ post-image
          └─ main-feed-spacer
          └─ image-post-card-container
            └─ image-post-card
              └─ post-info
                └─ post-header
                  └─ post-title
                    └─ post-title
                  └─ subreddit
                    └─ subreddit
                └─ post-stats
                  └─ image-post-card-count
                    └─ upvotes-downvotes-comments-count
              └─ post-image
          └─ main-feed-spacer
          └─ text-post-card-container (with hover highlight example)
            📝 Click anywhere on card: Open post detail view in modal (route: /post/{post_id})
            📝 Click subreddit name: Navigate to filtered view (route: /r/{subreddit})
            📝 Hover: Apply hover gradient effect (see below)
            📝 HOVER STATE: 
            📝 Padding: 16px - Border-radius: 35px (2.1875rem) - Background: linear-gradient(154deg, #413333 -83.09%, #171212 57.07%) - Transition: Smooth hover effect
            📝 Desktop: Standard vertical layout
            📝 Mobile (<768px):
            📝 Expand to full screen width
            📝 More square/compact shape
            📝 Title/subreddit/stats at top
            📝 Post content truncated with ellipsis or "Read more"
            📝 Container height adjusts to content (with max-height limit)
            └─ text-post-card
              └─ post-info
                └─ text-post-card-title
                  └─ text-post-card-title
                └─ text-post-card-community
                  📝 Subreddit name: Separate clickable link to /r/{subreddit}
                  └─ text-post-card-community
                └─ text-post-count-container
                  📝 Display only (read-only, no voting functionality)
                  📝 Show: upvotes, downvotes, comment count
                  📝 Individual icons with counts for each stat
                  └─ text-post-card-upvote-count-container
                    └─ upvote-icon
                      └─ upvote-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ upvote-count
                      └─ upvote-count
                  └─ text-post-card-downvote-count-container
                    └─ downvote-icon
                      └─ downvote-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ downvote-count
                      └─ downvote-count
                  └─ text-post-card-comment-count-container
                    └─ comment-icon
                      └─ comment-icon
                        └─ Vector - 0
                        └─ Depth 8, Frame 0
                    └─ comment-count
                      └─ comment-count
              └─ post-card-content-container
                └─ post-content
          └─ main-feed-spacer
          └─ image-post-card-container
            └─ image-post-card
              └─ post-info
                └─ post-header
                  └─ post-title
                    └─ post-title
                  └─ subreddit
                    └─ subreddit
                └─ post-stats
                  └─ image-post-card-count
                    └─ upvotes-downvotes-comments-count
              └─ post-image
          └─ main-feed-spacer
          └─ image-post-card-container
            └─ image-post-card
              └─ post-info
                └─ post-header
                  └─ post-title
                    └─ post-title
                  └─ subreddit
                    └─ subreddit
                └─ post-stats
                  └─ image-post-card-count
                    └─ upvotes-downvotes-comments-count
              └─ post-image
