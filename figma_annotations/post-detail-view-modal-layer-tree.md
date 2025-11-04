# Layer Tree Export: Selected Nodes
Exported on: 11/04/2025, 01:59:54 AM

---

└─ post-detail-view-modal
  📝 Renders as modal overlay on top of previous page
  📝 Previous page dimmed with dark overlay (rgba(0, 0, 0, 0.6))
  📝 Modal centered on screen, max-width: 960px - Body scroll locked when modal is open
  📝 Route: /post/:postId
  📝 Clean URL (no subreddit context for sharing)
  📝 Uses React Router useParams() to get postId
  📝 Use React portal for modal rendering
  📝 Click breadcrumb link (← back to r/Subreddit)
  📝 Click close button in top-right corner
  📝 Click outside modal (on dark background)
  📝 Press Escape key
  📝 Browser back button
  📝 All close actions except breadcrumb: Navigate back using browser history
  📝 Breadcrumb link: Always navigate to /r/{subreddit} (post's origin subreddit)
  📝 Breadcrumb takes user to post's subreddit regardless of where they clicked from
  📝 Example: User on home screen clicks r/technology post → breadcrumb goes to /r/technology
  📝 Desktop/Tablet: Modal with margins, background visible
  📝 Mobile (<768px): Full-screen modal (no margins, no background visible)
  📝 Trap focus within modal when open
  📝 Restore scroll position of previous page on close
  📝 POST DATA:
  📝 Endpoint: GET /r/{subreddit}/comments/{postId}.json
  📝 Note: Reddit API calls this "submissions" endpoint
  📝 Fetch on modal open
  📝 Extract: title, author, content, score, num_comments, created_utc, subreddit
  📝 COMMENTS DATA:
  📝 Endpoint: Same as post (returns both in response)
  📝 Reddit API structure: [post_data, comments_data]
  📝 Fetch separately from post rendering - Initial load: 50 top-level comments
  📝 Depth: Truncate to 2 levels maximum (comment + 1 reply level)
  📝 More deeply nested comments should be flattened or hidden
  📝 Load 50 more comments when user scrolls near bottom
  📝 Append to existing comments
  📝 Continue until all comments loaded
  📝 Redux currentPostSlice:
  📝 post (object): Current post data
  📝 comments (array): Top-level comments with nested replies (max 2 levels)
  📝 loading (boolean): Post/comments loading state
  📝 error (string | null): Error messages
  📝 hasMoreComments (boolean): For infinite scroll
  📝 INITIAL LOAD:
  📝 Show skeleton loader for post content
  📝 Show skeleton loaders for comment cards (3-5 skeletons)
  📝 Structure should match actual content layout
  📝 LOADING MORE COMMENTS:
  📝 Show loading spinner at bottom of comments section
  📝 Don't block interaction with existing content
  📝 If post fetch fails: 
  📝 Display centered error in modal: "Unable to load post. Please try again." with "Retry" button and "Close" button. 
  📝 Retry re-fetches from /r/{subreddit}/comments/{postId}.json. 
  📝 Set currentPostSlice.status to 'failed'. Log error to console.
  📝 BEHAVIOR:
  📝 Initial: Load 50 top-level comments
  📝 When user scrolls to ~80% of comments section: Load 50 more
  📝 Append new comments below existing ones
  📝 Continue until all comments loaded
  📝 LOADING INDICATOR:
  📝 Show spinner at bottom while fetching more
  📝 Don't block scrolling or interaction
  📝 MOBILE BEHAVIOR
  📝 MODAL:
  📝 Full-screen (100vw × 100vh)
  📝 No margins, no background visible
  📝 Scrollable content within modal
  📝 POST CONTENT:
  📝 Title: Same size, may wrap to multiple lines
  📝 Content: Full width, maintains readability
  📝 COMMENTS:
  📝 User icons: Keep same size (40px)
  📝 Level 2 indent: Reduce to 34px (half of desktop 68px)
  📝 Vote counts: Stay horizontal if space allows
  📝 Font sizes: Same as desktop (maintain readability)
  📝 Truncated comments and their replies should follow same display pattern as desktop
  📝 BACK LINK:
  📝 Stay at top, always visible
  📝 May reduce font size slightly for mobile
  📝 REDDIT API STRUCTURE:
  📝 Endpoint returns array: [post_listing, comments_listing]
  📝 Parse both from single response
  📝 Comments nested in "replies" property
  📝 COMMENT THREADING:
  📝 Recursive structure in API 
  📝 Flatten to 2 levels for display
  📝 Use recursive function to parse, stop at depth 2
  📝 MODAL IMPLEMENTATION:
  📝 React portal to render at root level
  📝 CSS: position: fixed, z-index: 1000
  📝 Dark overlay: position: fixed, background: rgba(0, 0, 0, 0.6)
  📝 Click overlay: Add onClick handler to close modal 
  📝 ACCESSIBILITY:
  📝 Focus trap within modal
  📝 Escape key listener
  📝 ARIA: role="dialog", aria-modal="true"
  📝 Focus close button on open
  └─ current-community-link-container
    📝 Click: Navigate to /r/{subreddit} (post's origin subreddit)
    📝 Always links to the subreddit the post belongs to
    📝 Text format: "← back to r/{subreddit_name}"
    📝 Extract subreddit name from post data (post.subreddit)
    📝 Display dynamically based on post, not user's previous location
    └─ current-community-link-container
      └─ current-community-link
    └─ spacer
    └─ close-modal-button
  └─ post-title-container
    └─ post-title
  └─ username-and-time-container
    📝 Format: "Posted by u/{username} • {time_ago}"
    📝 Username: Display only (no link in read-only app)
    📝 Timestamp: Convert from created_utc to relative time (1h, 2d, etc.)
    📝 Static timestamp (doesn't update in real-time)
    └─ username
    └─ spacer
    └─ spacer
    └─ elapsed-time
  └─ post-content-container
    📝 Text posts: Full text content, no max-height restriction
    📝 Image posts: Full-size image display
    📝 Link posts: Show title + URL (no embed)
    📝 Mobile: Content expands to full width
    📝 Images: Scale to fit container, maintain aspect ratio
    └─ post-content
  └─ post-counts-container
    📝 Counts are read-only: No click interactions, no hover states
    📝 Values from API, static once loaded
    └─ upvote-count-container
      └─ upvote-icon
        └─ upvote-icon
          └─ Vector - 0
          └─ Depth 8, Frame 0
      └─ upvote-group
        └─ upvote-count
    └─ downvote-count-container
      └─ downvote-icon
        └─ downvote-icon
          └─ Vector - 0
          └─ Depth 8, Frame 0
      └─ downvote-group
        └─ downvote-count
    └─ comment-group
      └─ comment-icon
        └─ comment-icon
          └─ Vector - 0
          └─ Depth 8, Frame 0
      └─ comment-group
        └─ comment-count
  └─ comments-title-container
    └─ comments-title
  └─ comment-card
    📝 If comments fetch fails but post loads successfully: 
    📝 Show post content normally. 
    📝 Below post, display: "Unable to load comments" with "Retry" button. Retry only re-fetches comments (not entire post). 
    📝 If no comments exist (empty array), show: "No comments yet."
    └─ user-icon
    └─ comment-content-container
      └─ username-and-time-container
        └─ username
          └─ username
        └─ elapsed-time-container
          └─ elapsed-time-count
      └─ comment-content
        └─ comment-content
      └─ upvote-downvote-count-container
        └─ upvote-group
          └─ upvote-icon
            └─ upvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ upvote-group
            └─ upvote-count
        └─ downvote-group
          └─ downvote-icon
            └─ downvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ downvote-group
            └─ downvote-count
  └─ comment-card-reply (level 2)
    📝 Left padding: 68px (indent to show nesting)
    📝 Same structure as comment-card otherwise
    📝 VISUAL DIFFERENCE FROM LEVEL 1:
    📝 Left padding: 68px (indent to show nesting)
    📝 Same structure as comment-card otherwise
    📝 TRUNCATION: 
    📝 If a level 2 comment has replies, don't display them
    📝 Max nesting: 2 levels only
    📝 Show "[X more replies]" text  if deeper threads exist
    📝 Clicking "[X more replies]" text should expand 5 more replies
    📝 These additional replies should be appropriately indented and nested
    📝 If nested reply data is malformed or missing required fields: 
    📝 Skip rendering that specific reply (fail silently). 
    📝 Log error to console with comment ID. 
    📝 Don't break parent comment or other replies. 
    📝 Maintain comment thread structure with available data only.
    └─ user-icon
    └─ comment-content-container
      └─ username-and-time-container
        └─ username
          └─ username
        └─ elapsed-time-container
          └─ elapsed-time-count
      └─ comment-content
        └─ comment-content
      └─ upvote-downvote-count-container
        └─ upvote-group
          └─ upvote-icon
            └─ upvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ upvote-group
            └─ upvote-count
        └─ downvote-group
          └─ downvote-icon
            └─ downvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ downvote-group
            └─ downvote-count
  └─ comment-card
    └─ user-icon
    └─ comment-content-container
      └─ username-and-time-container
        └─ username
          └─ username
        └─ elapsed-time-container
          └─ elapsed-time-count
      └─ comment-content
        └─ comment-content
      └─ upvote-downvote-count-container
        └─ upvote-group
          └─ upvote-icon
            └─ upvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ upvote-group
            └─ upvote-count
        └─ downvote-group
          └─ downvote-icon
            └─ downvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ downvote-group
            └─ downvote-count
  └─ comment-card-reply (level 2)
    └─ user-icon
    └─ comment-content-container
      └─ username-and-time-container
        └─ username
          └─ username
        └─ elapsed-time-container
          └─ elapsed-time-count
      └─ comment-content
        └─ comment-content
      └─ upvote-downvote-count-container
        └─ upvote-group
          └─ upvote-icon
            └─ upvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ upvote-group
            └─ upvote-count
        └─ downvote-group
          └─ downvote-icon
            └─ downvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ downvote-group
            └─ downvote-count
  └─ comment container
    └─ user-icon
    └─ comment-content-container
      └─ username-and-time-container
        └─ username
          └─ username
        └─ elapsed-time-container
          └─ elapsed-time-count
      └─ comment-content
        └─ comment-content
      └─ upvote-downvote-count-container
        └─ upvote-group
          └─ upvote-icon
            └─ upvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ upvote-group
            └─ upvote-count
        └─ downvote-group
          └─ downvote-icon
            └─ downvote-icon
              └─ Vector - 0
              └─ Depth 10, Frame 0
          └─ downvote-group
            └─ downvote-count
