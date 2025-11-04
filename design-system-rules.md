# Reddit Client - Design System Rules

## Overview
This document contains comprehensive design system rules derived from Figma designs with dev mode annotations. It covers all four pages of the application with detailed specifications for layout, behavior, state management, API integration, and responsive design.

---

## Pages Analyzed
1. **Home Screen** - Main feed with trending posts from r/all
2. **Filtered View Page** - Subreddit-specific posts with sorting options
3. **Search Results Page** - Search functionality with Posts/Communities/People tabs
4. **Post Detail View Modal** - Full post view with comments in a modal overlay

---

## Table of Contents
1. [Global Patterns](#global-patterns)
2. [Home Screen](#home-screen)
3. [Filtered View Page](#filtered-view-page)
4. [Search Results Page](#search-results-page)
5. [Post Detail View Modal](#post-detail-view-modal)
6. [Routing & Navigation](#routing--navigation)
7. [Responsive Design](#responsive-design)
8. [Error Handling](#error-handling)

---

# Global Patterns

## Navigation Bar
**Appears on**: Home Screen, Filtered View, Search Results

### Standard Navigation (Home & Filtered View)
**Container**: `nav-bar-container` (1280x65)
- **Padding**: 40px horizontal, 12px vertical
- **Height**: 65px fixed

#### Home Button
- **Container**: 88x23
- **Structure**: Reddit icon (16x16) + text "Reddit"
- **Behavior**:
  - Click: Navigate to home screen (route: `/` or `/home`)
  - If already on home page: Refresh the page
  - Hover: Add subtle drop shadow effect

#### Search Bar
- **Container**: 160x40
- **Position**: 120px from left edge of nav controls
- **Structure**: Search button (40x40) with icon (24x24) + Search input field (120x40)

**Behavior**:
- On focus: Animate to screen center and expand to 20% viewport width
- Input: Allow text entry, show autocomplete suggestions for popular subreddits
- Submit (Enter key or search button click): Navigate to `/search?q={query}`
- Validation: Must contain at least 1 character (cannot be blank)
- Empty submission: Flash error message "Please enter a search term" for 2 seconds
- Autocomplete: Display dropdown with popular subreddit suggestions as user types

**State Management**:
- **Local state**: `searchQuery`, `showAutocomplete`, `autocompleteSuggestions`, `errorMessage`

**API Integration**:
- Fetch autocomplete suggestions from Reddit API as user types (debounced)
- On submit: Navigate to `/search` with query param
- Empty input validation: Show error toast/message for 2 seconds
- API failure for autocomplete: Silently fail, allow search anyway

**Responsive**:
- Desktop/Tablet: Full search bar visible
- Mobile (<768px): Collapse to search icon only
  - Click icon: Expand to full screen width
  - Click outside or submit: Collapse back to icon

### Compact Navigation (Search Results Page)
**Container**: `nav-bar-container` (height: 48px - compact)
- Only includes home button (no search bar, search is in main content)

---

## Sidebar Component
**Appears on**: Home Screen, Filtered View
**Dimensions**: 320x2460
**Position**: 24px from left edge, 20px from top of main content

**Data Fetching**:
- **On mount**: Fetch top/most popular subreddits from Reddit API
- **Endpoint**: `GET /subreddits/popular.json`
- Display list of communities with icons and names

**State Management**:
- **Redux**: `communities` (array of subreddit objects), loading status, error state

**Scrolling Behavior**:
- Sidebar scrolls independently from main content
- Fixed width, vertical scroll when content exceeds viewport height

**Responsive**:
- Desktop/Tablet: Visible sidebar on left
- Mobile (<768px): Collapse to hamburger menu icon
  - Click hamburger: Open slide-out/modal with scrollable community list
  - Click outside or select community: Close menu

### Sidebar Title
- **Container**: 320x47
- **Text**: "Communities"
- **Padding**: 16px

### Community List Item
**Dimensions**: 320x56 (standard)

**Structure**:
- Icon container: 40x40 (16px from left, 8px from top)
- Icon: 24x24 (centered within container, 8px padding)
- Title/Button: 232x24 (72px from left, 16px from top)

**Icon Display**:
- **Source**: Subreddit icon URL from Reddit API
- **Fallback**: Display placeholder icon if `icon_img` is null/empty
- **Size**: 40px × 40px
- **Border-radius**: 8px

**Text Display**:
- Display subreddit `display_name` or `name` from API

**Behavior**:
- **Click**: Navigate to filtered view page (route: `/r/{subreddit_name}`)
- **Hover**: Apply hover state styles
- **Selection** (Filtered View only): Persist selected state based on URL

**States**:

*Hover State*:
- Width: 17rem (272px)
- Height: 3.5rem (56px)
- Padding: 0 1rem
- Border-radius: 1.3125rem (21px)
- Background: #3B2B26

*Selected State (Filtered View only)*:
- Width: 272px (17rem)
- Height: 56px (3.5rem)
- Padding: 0 16px
- Border-radius: 21px (1.3125rem)
- Background: #3B2B26
- Compare `activeSubreddit` from Redux with community name to determine selection

---

## Post Cards

### Image Post Card
**Container dimensions**: 908x193
**Card dimensions**: 876x161 (16px padding from container)

**Layout**: Two-column structure
- **Left column** (`post-info`): 573x161
- **Right column** (`post-image`): 303x161

**Post Info Structure**:
1. **Post Header** (573x45):
   - Post title (573x20) - full width
   - Subreddit (573x21) - 24px from top

2. **Post Stats** (346x32):
   - Position: 61px from top
   - Text container: 16px left padding
   - Format: "X upvotes | X downvotes | X comments"

**Behavior**:
- **Click anywhere on card**: Open post detail view in modal (route: `/post/{post_id}`)
- **Click subreddit name**: Navigate to filtered view (route: `/r/{subreddit}`)
- **Post Stats**: Display only (read-only, no voting functionality)

**Image Handling**:
- If image fails to load (broken thumbnail URL or 404):
  - Display placeholder image with Reddit logo or light gray background
  - Use onError event handler: `<img onError={(e) => e.target.src = fallbackImage} />`
  - Never show broken image icon

**Hover State**:
- Padding: 16px
- Border-radius: 35px (2.1875rem)
- Background: `linear-gradient(130deg, #171212 55.96%, #413333 116.73%)`
- Transition: Smooth hover effect

**Responsive**:
- **Desktop**: Standard layout with image on right, info on left
- **Mobile (<768px)**:
  - Expand to full screen width
  - Stack vertically: Title/subreddit/stats on top, image below
  - Image scales to fit container width

---

### Text Post Card
**Container dimensions**: 908x260
**Card dimensions**: 876x228 (16px padding from container)

**Structure**:
1. **Post Info Header** (844x34):
   - Padding: 16px all around
   - **Title** (101x32): Left-aligned
   - **Community** (207x34): 178px from left
   - **Count Container** (382x40): 462px from left

2. **Count Container Components**:
   - **Upvote count** (80x40): 16px from left - Icon (24x24) + count text (24x20)
   - **Downvote count** (77x40): 112px from left - Icon (24x24) + count text (21x20)
   - **Comment count** (79x40): 205px from left - Icon (24x24) + count text (23x20)

3. **Content Container** (844x162):
   - Position: 50px from top
   - Content text: 50px left padding, 19px top padding
   - Content area: 744x124

**Behavior**:
- **Click anywhere on card**: Open post detail view in modal (route: `/post/{post_id}`)
- **Click subreddit name**: Navigate to filtered view (route: `/r/{subreddit}`)
- **Stats**: Display only (read-only, no voting functionality)

**Hover State**:
- Padding: 16px
- Border-radius: 35px (2.1875rem)
- Background: `linear-gradient(154deg, #413333 -83.09%, #171212 57.07%)`
- Transition: Smooth hover effect

**Responsive**:
- **Desktop**: Standard vertical layout
- **Mobile (<768px)**:
  - Expand to full screen width
  - More square/compact shape
  - Title/subreddit/stats at top
  - Post content truncated with ellipsis or "Read more"
  - Container height adjusts to content (with max-height limit)

---

# Home Screen

**Route**: `/` or `/home`

## Layout
- **Page container**: 1280x2570
- **Two-column layout**: Sidebar (320px) + Main Feed (908px)
- **Gap between columns**: 28px

## Main Feed Component
**Dimensions**: 908x2447
**Position**: 348px from left, 20px from top

**Data Fetching**:
- **On mount**: Fetch "best" posts from r/all
- **Endpoint**: `GET /r/all/best.json?limit=10`
- **Infinite scroll**: Load 10 more posts when user scrolls near bottom
- Append new posts to existing posts array

**Card Type Logic**:
- If API provides image asset (and it's not just an icon): Render `ImagePostCard`
- Otherwise: Render `TextPostCard`
- Check: `post.preview` or `post.url` for valid image URLs

**State Management**:
- **Redux postsSlice**: `posts` (array), `loading`, `error`, `hasMore` (boolean)

**Infinite Scroll**:
- Trigger next page load when user reaches ~80% of current content
- Show loading spinner while fetching more posts

**Error Handling**:
- Initial post fetch failure: Display centered error: "Unable to load posts. Please check your connection and try again." + "Retry" button
- Set Redux `postsSlice.status` to 'failed'
- Load more failure: Display error banner at bottom: "Couldn't load more posts" + "Try again" link
- Keep existing posts visible, don't block interaction

### Feed Title
- **Container**: 908x72
- **Text**: "Trending Posts"
- **Padding**: 16px

### Feed Spacer
- **Dimensions**: 908x56
- Consistent spacing between feed items

---

# Filtered View Page

**Route**: `/r/:subreddit`

## Route Handling
- Extract subreddit from URL using React Router `useParams()` hook
- Example: `/r/technology` → `subreddit = "technology"`

**On Mount**:
- Extract subreddit from URL params
- Update Redux with active subreddit
- Fetch posts for that subreddit with default `sort="best"`
- Endpoint: `GET /r/{subreddit}/{sort}.json?limit=10`

**State Management**:
- **Redux filterSlice**: `activeSubreddit` (string from URL), `sortOrder` (string: 'best' | 'hot' | 'new' | 'top' | 'rising')
- **Redux postsSlice**: Same as home screen

## Layout
- Same two-column layout as Home Screen
- Sidebar shows selected state for current subreddit

## Sidebar Behavior (Filtered View)
- Read `activeSubreddit` from Redux `filterSlice`
- Compare each community name with `activeSubreddit`
- If match: Apply selected state styling (see Community List Item - Selected State)

## Main Feed Component

**Data Fetching**:
- Fetch posts from: `GET /r/{subreddit}/{sort}.json?limit=10`
- When sort changes: REPLACE all posts (don't append)
- Show loading state during fetch
- Infinite scroll: Append more posts with same sort parameter

**Card Type Logic**: Same as home screen

**Error Handling**:
- **Subreddit doesn't exist (404)**: Display centered message: "r/{subreddit} not found. This community may not exist or may have been removed." + "Back to Home" button. No retry option.
- **Filtered posts fetch fails**: Display centered error: "Unable to load posts from r/{subreddit}. Please try again." + "Retry" button. Keep sidebar visible.
- **Load more posts fails**: Display error banner at bottom: "Couldn't load more posts" + "Try again" link. Keep existing posts visible.

### Sorting Bar
**Container height**: 66px
**Bar height**: 54px

**Sort Options**: Best (default), Hot, New, Top, Rising

**Click sort button**:
- Update Redux `sortOrder` state
- Update URL: `/r/{subreddit}?sort={sortOrder}`
- Clear existing posts
- Fetch new posts with selected sort parameter
- Reset infinite scroll (`hasMore = true`)

**Button States**:

*Default (Unselected)*:
- Padding: 16px 0
- Color: #BAA39C (secondary text color)
- No border-bottom
- Box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)

*Selected*:
- Padding: 16px 0 13px 0
- Border-bottom: 3px solid #E5E8EB
- Color: #FFFFFF (primary text)
- Box-shadow: none
- Display: flex, flex-direction: column, justify-content: center, align-items: center

**Responsive**:
- Desktop: Standard flex row, all buttons visible
- Mobile (<768px): Display: flex with overflow-x: scroll, enable horizontal scrolling

**State Management**:
- **Redux filterSlice**: `sortOrder`
- Update `sortOrder` on button click
- Trigger new API call in useEffect when `sortOrder` changes

---

# Search Results Page

**Route**: `/search?q={query}&sort={sortBy}&tab={activeTab}`

## URL Structure & State Synchronization
- On page load: Parse URL parameters and set initial Redux state
- On state changes (new search, sort change, tab change): Update URL without full page reload
- Browser back/forward buttons: Update Redux state to match URL parameters

## Layout
- **No sidebar** - single column layout
- Compact navigation (home button only)
- Search bar in main content area
- Sorting tabs and results

## Main Page Container

**Initial Page Load**:
- Fetch first 10 results from Reddit API based on URL parameters
- Endpoint: `/r/all/search.json?q={query}&sort={sortBy}&limit=10&after={lastPostId}`

**State Management**:
- **Redux searchSlice**:
  - `results`: Array of search result objects
  - `hasMore`: Boolean indicating if more results available
  - `after`: String for pagination cursor (last item ID from previous fetch)
  - `status`: 'idle' | 'loading' | 'succeeded' | 'failed'
  - `activeTab`: 'posts' | 'communities' | 'people'
  - `sortBy`: 'relevance' | 'new' | 'top'
  - `query`: Current search query
  - Separate result arrays: `postsResults`, `communitiesResults`, `peopleResults`

**Infinite Scroll**:
- When user scrolls near bottom: If `hasMore` is true and status is not 'loading', fetch next batch
- Append new results to existing results array

**Error Handling**:
- Network errors: Display user-friendly error message with retry option
- No results: Show empty state: "No results found for '{query}'. Try a different search term."
- API rate limiting: Display message "Too many requests. Please wait a moment and try again."
- Initial search fails: "Unable to load search results. Please try again."
- Pagination fetch fails: "Unable to load more results."

## Search Bar Section

**Search Bar**:
- Pre-fills with query parameter from URL (`?q=search-term`)
- Users can modify the search term and click search button or press Enter
- On submit (empty): Flash error message "Please enter a search term" for 2 seconds
- On submit (valid): Dispatch Redux action to fetch new results from Reddit API
- Update URL with new query parameter without full page reload
- On search submission: Set `status: 'loading'`, clear previous results
- On successful fetch: Update results array and set `status: 'succeeded'`

## Sorting Bar (Tabs)

**Three tabs**: Posts (default/selected on page load), Communities, People

**Behavior**:
- Clicking a tab switches the active tab and displays corresponding results
- Active tab shows selection highlight (underline or background color per design)

**Tab Content**:
- **Posts tab**: Display search results with post cards (titles, thumbnails, vote counts, comments)
- **Communities tab**: Display community cards (community name as title, blank information panel, community icon/thumbnail from API)
- **People tab**: Display user cards (username as title, blank information panel, user avatar from API if available)

**State Management**:
- Redux `searchSlice.activeTab`: Track which tab is currently selected
- Each tab maintains its own results in separate arrays

**Error Handling**:
- If tab switch fails: Display inline error below tabs: "Unable to load {tab_name}. Try again or switch to a different tab." + "Retry" link
- Keep previous tab's results visible until new tab successfully loads
- Set `searchSlice.tabStatus[tab_name]` to 'failed'

## Sub-Sorting Bar

**Three sub-sorting buttons**: Relevance (default), New, Top

**Visibility**:
- Only visible and functional when Posts tab is active
- Hide or disable sub-sorting bar when Communities or People tabs are selected

**Behavior**:
- Active sub-sort button shows visual selection state (background color per design)
- Clicking a sub-sort button triggers new API call with updated sort parameter
- Reddit API endpoint: `/r/all/search.json?q={query}&sort={relevance|new|top}&limit=10`
- Results update to reflect new sort order

**State Management**:
- Redux `searchSlice.sortBy`: Store current sort value
- URL updates with sort parameter: `/search?q={query}&sort={sortBy}`
- On sort change: set `status: 'loading'`, fetch with new sort, update results

**Responsive (Mobile)**:
- Replace horizontal button group with dropdown menu button
- Dropdown spans full width of screen below Posts/Communities/People tabs
- Dropdown button follows same visual style as desktop sub-sorting buttons
- Tapping dropdown reveals options: Relevance, New, Top
- Selected option displays in dropdown button label

## Search Results Card

**Card Behavior**:
- **Posts**: Clicking card opens post in modal overlay (same as Home Screen and Filtered View)
- **Communities**: Clicking card navigates to Filtered View for that subreddit (`/r/{subreddit}`)
- **People**: Cards are unclickable for MVP (no cursor pointer, no hover state)

**Hover State**:
- Cards show hover styling (border-radius change or background color shift) except for People tab

**Navigation**:
- **Posts**: Clicking card dispatches action to `currentPostSlice` to set active post, opens modal
- **Communities**: React Router navigation to Filtered View route with subreddit parameter
- **People**: No action (disabled state)

**Card Structure**:
- `search-results-card-image`: Thumbnail (70x70, border-radius: 20px)
- `search-results-card-information`:
  - `search-results-card-title`: Title text
  - `search-results-card-counts-container`: Counts (upvotes, comments)
  - `search-results-card-information-container`: Meta info (community name, username, elapsed time)

**Responsive**:
- **Desktop (>1024px)**: Full layout, horizontal sub-sorting buttons, search results cards in single column
- **Tablet (768px-1024px)**: Maintain horizontal sub-sorting buttons (may reduce padding), cards adjust width
- **Mobile (<768px)**:
  - Stack all elements vertically
  - Full-width search bar
  - Full-width sorting tabs
  - Dropdown menu for sub-sorting
  - Full-width search result cards
  - Reduce padding and font sizes for compact display

---

# Post Detail View Modal

**Route**: `/post/:postId`

## Modal Implementation

**Rendering**:
- Renders as modal overlay on top of previous page
- Previous page dimmed with dark overlay (rgba(0, 0, 0, 0.6))
- Modal centered on screen, max-width: 960px
- Body scroll locked when modal is open
- Use React portal for modal rendering
- CSS: position: fixed, z-index: 1000

**Accessibility**:
- Focus trap within modal
- Escape key listener
- ARIA: `role="dialog"`, `aria-modal="true"`
- Focus close button on open

**Close Actions**:
- Click breadcrumb link (← back to r/Subreddit)
- Click close button in top-right corner
- Click outside modal (on dark background)
- Press Escape key
- Browser back button

**Navigation on Close**:
- All close actions except breadcrumb: Navigate back using browser history
- Breadcrumb link: Always navigate to `/r/{subreddit}` (post's origin subreddit)
- Breadcrumb takes user to post's subreddit regardless of where they clicked from
- Example: User on home screen clicks r/technology post → breadcrumb goes to /r/technology

**Responsive**:
- **Desktop/Tablet**: Modal with margins, background visible
- **Mobile (<768px)**: Full-screen modal (100vw × 100vh, no margins, no background visible)
- Trap focus within modal when open
- Restore scroll position of previous page on close

## Data Fetching

**Post Data**:
- **Endpoint**: `GET /r/{subreddit}/comments/{postId}.json`
- Note: Reddit API calls this "submissions" endpoint
- Fetch on modal open
- Extract: title, author, content, score, num_comments, created_utc, subreddit

**Comments Data**:
- **Endpoint**: Same as post (returns both in response)
- Reddit API structure: `[post_data, comments_data]`
- Parse both from single response
- Fetch separately from post rendering

**Comments Structure**:
- Initial load: 50 top-level comments
- Depth: Truncate to 2 levels maximum (comment + 1 reply level)
- More deeply nested comments should be flattened or hidden
- Comments nested in "replies" property
- Use recursive function to parse, stop at depth 2

**Infinite Scroll (Comments)**:
- Load 50 more comments when user scrolls near bottom
- Append to existing comments
- Continue until all comments loaded
- Show loading spinner at bottom while fetching more
- Don't block scrolling or interaction

**State Management**:
- **Redux currentPostSlice**:
  - `post` (object): Current post data
  - `comments` (array): Top-level comments with nested replies (max 2 levels)
  - `loading` (boolean): Post/comments loading state
  - `error` (string | null): Error messages
  - `hasMoreComments` (boolean): For infinite scroll

**Loading States**:
- **Initial load**: Show skeleton loader for post content + skeleton loaders for comment cards (3-5 skeletons)
- **Loading more comments**: Show loading spinner at bottom of comments section, don't block interaction

**Error Handling**:
- **Post fetch fails**: Display centered error in modal: "Unable to load post. Please try again." + "Retry" button + "Close" button. Retry re-fetches from endpoint. Log error to console.
- **Comments fetch fails but post loads**: Show post content normally. Below post, display: "Unable to load comments" + "Retry" button. Retry only re-fetches comments.
- **No comments exist**: Show: "No comments yet."
- **Malformed nested reply data**: Skip rendering that specific reply (fail silently). Log error to console with comment ID. Don't break parent comment or other replies.

## Components

### Breadcrumb Link
- **Text format**: "← back to r/{subreddit_name}"
- Extract subreddit name from post data (`post.subreddit`)
- Display dynamically based on post, not user's previous location
- Click: Navigate to `/r/{subreddit}`

### Close Button
- Located in top-right corner
- Click: Close modal and navigate back

### Post Title
- **Font size**: 22px
- **Line height**: 28px

### Username and Time
- **Format**: "Posted by u/{username} • {time_ago}"
- Username: Display only (no link in read-only app)
- Timestamp: Convert from `created_utc` to relative time (1h, 2d, etc.)
- Static timestamp (doesn't update in real-time)

### Post Content Container
- **Height**: 256px
- **Text posts**: Full text content, no max-height restriction
- **Image posts**: Full-size image display
- **Link posts**: Show title + URL (no embed)
- **Mobile**: Content expands to full width, images scale to fit container, maintain aspect ratio

### Post Counts Container
- Counts are read-only: No click interactions, no hover states
- Values from API, static once loaded
- Display: upvote count, downvote count, comment count

### Comments Title
- **Height**: 60px
- **Font size**: 22px
- **Line height**: 28px

### Comment Card

**Structure**:
- User icon (40px, border-radius: 20px)
- Comment content container:
  - Username and time (username: bold, 14px/21px | elapsed time: 14px/21px, color: #baa39c)
  - Comment content (14px/21px)
  - Upvote/downvote count container (icons: 20px, gap: 36px)

**Level 2 Comment Reply**:
- **Left padding**: 68px (indent to show nesting)
- Same structure as comment-card otherwise

**Truncation**:
- If a level 2 comment has replies, don't display them
- Max nesting: 2 levels only
- Show "[X more replies]" text if deeper threads exist
- Clicking "[X more replies]" text should expand 5 more replies
- These additional replies should be appropriately indented and nested

**Responsive (Mobile)**:
- User icons: Keep same size (40px)
- Level 2 indent: Reduce to 34px (half of desktop 68px)
- Vote counts: Stay horizontal if space allows
- Font sizes: Same as desktop (maintain readability)
- Truncated comments follow same display pattern as desktop
- Back link: Stay at top, always visible, may reduce font size slightly

---

# Routing & Navigation

## Routes
- `/` or `/home` - Home Screen
- `/r/:subreddit` - Filtered View (subreddit-specific posts)
- `/r/:subreddit?sort={sortOrder}` - Filtered View with sort parameter
- `/post/:postId` - Post Detail View (modal)
- `/search?q={query}&sort={sortBy}&tab={activeTab}` - Search Results page

## Navigation Patterns
- **Home button**: Always navigates to home, refreshes if already on home
- **Community items**: Navigate to filtered view for that subreddit
- **Post cards**: Open post detail modal
- **Subreddit names in posts**: Navigate to filtered view
- **Search bar** (nav): Navigates to search results page with query param
- **Search bar** (search results page): Updates results in-place, updates URL
- **Breadcrumb in modal**: Navigate to post's origin subreddit
- **Close modal**: Navigate back using browser history

---

# Responsive Design

## Breakpoints
- **Desktop**: >1024px
- **Tablet**: 768px-1024px
- **Mobile**: <768px

## Component Behavior

### Navigation Bar
- **Desktop/Tablet**: Full navigation with search bar
- **Mobile**: Search bar collapses to icon only (except on Search Results page)

### Sidebar
- **Desktop/Tablet**: Visible sidebar on left
- **Mobile**: Collapse to hamburger menu icon, slide-out/modal on click

### Search Results Page
- **Desktop**: Full layout with horizontal sub-sorting buttons, single column cards
- **Tablet**: Maintain horizontal sub-sorting (reduced padding), cards adjust width
- **Mobile**: Stack vertically, full-width elements, dropdown for sub-sorting, reduced padding/font sizes

### Sorting Bar (Filtered View)
- **Desktop**: All buttons visible in row
- **Mobile**: Horizontal scroll container with overflow-x: scroll

### Post Cards
- **Desktop**: Standard layout (image cards: image right, info left)
- **Mobile**: Stack vertically, full-width, image scales to fit

### Post Detail Modal
- **Desktop/Tablet**: Modal with margins, background visible
- **Mobile**: Full-screen modal (100vw × 100vh)

---

# Error Handling

## Error Types & Messages

### Home Screen
- **Initial post fetch fails**: "Unable to load posts. Please check your connection and try again." + "Retry" button
- **Load more posts fails**: Error banner at bottom: "Couldn't load more posts" + "Try again" link

### Filtered View
- **Subreddit doesn't exist (404)**: "r/{subreddit} not found. This community may not exist or may have been removed." + "Back to Home" button (no retry)
- **Filtered posts fetch fails**: "Unable to load posts from r/{subreddit}. Please try again." + "Retry" button
- **Load more posts fails**: Error banner at bottom: "Couldn't load more posts" + "Try again" link

### Search Results
- **Initial search fails**: "Unable to load search results. Please try again."
- **Pagination fetch fails**: "Unable to load more results."
- **No results**: "No results found for '{query}'. Try a different search term."
- **API rate limiting**: "Too many requests. Please wait a moment and try again."
- **Tab switch fails**: Inline error below tabs: "Unable to load {tab_name}. Try again or switch to a different tab." + "Retry" link
- **Search bar empty submission**: Flash error "Please enter a search term" for 2 seconds

### Post Detail Modal
- **Post fetch fails**: Centered error in modal: "Unable to load post. Please try again." + "Retry" button + "Close" button
- **Comments fetch fails (post loads)**: Show post content normally, below display: "Unable to load comments" + "Retry" button
- **No comments exist**: "No comments yet."
- **Malformed nested reply**: Skip rendering, fail silently, log to console

### Search Bar (Nav)
- **Empty submission**: Flash error "Please enter a search term" for 2 seconds
- **Autocomplete API fails**: Silently fail, allow search anyway

### Image Loading
- **Image fails to load**: Display placeholder image with Reddit logo or light gray background, use `onError` handler, never show broken image icon

## Error Principles
- Always provide clear, user-friendly error messages
- Offer retry options where appropriate
- Keep existing content visible when "load more" fails
- Don't block user interaction during error states
- Log errors to console for debugging
- Use appropriate Redux state properties (`status: 'failed'`, `error: message`)

---

## Component Naming Conventions

All component names follow kebab-case with descriptive suffixes:
- `-container`: Wrapper elements
- `-button`: Interactive elements
- `-icon`: Icon elements
- `-count`: Numeric displays
- `-card`: Card components
- `-bar`: Bar/toolbar components
- `-modal`: Modal overlays

**Hierarchy indicators**:
- Nested components use parent name as prefix
- Clear semantic naming (e.g., `post-info`, `post-header`, `post-stats`)

---

## Design Variables (Gradients)
From Figma variables:
- `Image Card Gradient`: Applied to image post cards on hover
- `Text Card Gradient`: Applied to text post cards on hover

---

## Notes for Implementation

1. **Fixed dimensions**: The design uses specific pixel values - maintain these for consistency at desktop size
2. **Two-column layout**: Sidebar + Main Feed is the core layout pattern for Home and Filtered View
3. **Single-column layout**: Search Results page has no sidebar
4. **Card variants**: Both Image and Text post cards are used throughout
5. **Hover feedback**: Required for interactive elements (except People cards in search results)
6. **Icon sizing**: Consistent 24x24 for icons, 40x40 for icon containers
7. **Spacing consistency**: Use the 56px feed spacer pattern throughout
8. **Design tokens**: Reference `design-tokens.js` for colors, typography, spacing, and other tokens
9. **Redux architecture**: Separate slices for different concerns (posts, filter, search, currentPost, communities)
10. **URL synchronization**: Keep Redux state in sync with URL parameters for browser history support
11. **Infinite scroll**: Common pattern across all pages with feeds/lists
12. **Read-only app**: No voting, no posting, no commenting - display only
13. **Modal implementation**: Use React portals, focus trapping, and proper accessibility attributes
14. **Comment nesting**: Maximum 2 levels, truncate deeper threads
15. **Error resilience**: Graceful error handling with user-friendly messages and retry options

---

## Updates Log
- **2025-11-04**: Comprehensive update with all four pages from Figma annotations
  - Added Filtered View Page specifications
  - Added Search Results Page specifications
  - Added Post Detail View Modal specifications
  - Added Global Patterns section for shared components
  - Added comprehensive Responsive Design section
  - Added comprehensive Error Handling section
  - Reorganized structure with Table of Contents
  - Added detailed state management for all pages
  - Added API endpoints and data fetching patterns
  - Added routing and navigation patterns
- **2025-11-03**: Updated with comprehensive annotations from Figma Dev Mode (Home Screen)
  - Added behavior specifications for all interactive components
  - Added API integration details (endpoints, data fetching)
  - Added state management requirements (Redux vs Local)
  - Added responsive design breakpoints and behaviors
  - Added error handling patterns
  - Added routing information
- **2025-11-01**: Initial creation with Home Screen (22:190) analysis
