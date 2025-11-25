# Post Detail Modal - Image Display Troubleshooting Checklist

## Step 1: Verify Post Data Structure
- [ ] Open browser DevTools (F12) → Console tab
- [ ] Click on an image post to open the modal
- [ ] In the console, check if the post data is loaded
- [ ] Look for errors in the console (red text)
- [ ] **What to report**: Does the post object exist? Any errors?

## Step 2: Check Post Properties
- [ ] In the Console tab, type: `window.location.pathname`
- [ ] Note the post ID (e.g., `/post/abc123`)
- [ ] In Redux DevTools (if installed) or Console, check the post data
- [ ] **Key properties to check**:
  ```javascript
  // Look for these in the currentPost slice:
  post.url          // Should be image URL or Reddit post URL
  post.preview      // Should have preview images
  post.thumbnail    // Thumbnail URL
  post.postHint     // Should be 'image' for image posts
  post.selftext     // Should be empty or minimal for image posts
  ```
- [ ] **What to report**: Which properties exist? What values do they have?

## Step 3: Check if PostDetailContent Displays Images
- [ ] Open `src/components/PostDetailContent/PostDetailContent.jsx`
- [ ] Search for code that handles image display
- [ ] **Question**: Does the component have an `<img>` tag for post images?
- [ ] **Current observation**: Component only shows `selftext` (text content)
- [ ] **What to report**: Is there image rendering code? Yes/No

## Step 4: Test with Known Image Post
- [ ] Go to Home page (`/`)
- [ ] Find a post card that has an image thumbnail
- [ ] Click on that post to open the modal
- [ ] **What to report**:
  - Does the thumbnail show in the post card? Yes/No
  - Does the image show in the modal? Yes/No
  - Does the modal show any content besides title/text? Yes/No

## Step 5: Check Network Requests
- [ ] Open DevTools → Network tab
- [ ] Clear the network log (trash icon)
- [ ] Click on an image post
- [ ] **Look for**:
  - Reddit API request (should see `reddit.com/comments/...`)
  - Image loading requests (should see image URLs like `i.redd.it` or `preview.redd.it`)
- [ ] **What to report**:
  - Do you see the API request? Yes/No
  - Do you see image requests? Yes/No
  - Any failed requests (red)? Yes/No

## Step 6: Check ImagePostCard vs PostDetail
- [ ] Compare image display between:
  - **ImagePostCard** (works on home page) - `src/components/PostCard/ImagePostCard.jsx`
  - **PostDetailContent** (broken in modal) - `src/components/PostDetailContent/PostDetailContent.jsx`
- [ ] **What to report**: Does ImagePostCard have image code that PostDetailContent is missing?

## Step 7: Inspect Modal HTML
- [ ] Open the modal with an image post
- [ ] Right-click anywhere in the modal → "Inspect"
- [ ] Look at the HTML structure in DevTools
- [ ] **What to report**:
  - Do you see an `<img>` element? Yes/No
  - If yes, what is the `src` attribute value?
  - If no, modal only contains text elements? Yes/No

## Step 8: Test Post Type Detection
- [ ] Open browser console
- [ ] Click an image post
- [ ] After modal opens, type in console:
  ```javascript
  // Get the current post from Redux (you may need Redux DevTools)
  // Or check the Network tab for the API response
  ```
- [ ] **What to report**:
  - Does the post have `post_hint: "image"`?
  - Does it have a `preview` object with images?

## Information to Provide

Please report the following:

### 1. Console Errors
```
Copy any red error messages from the console here
```

### 2. Post Data Sample
```javascript
{
  id: "...",
  title: "...",
  postHint: "...",  // value here?
  url: "...",       // value here?
  thumbnail: "...", // value here?
  preview: {...}    // exists? yes/no
}
```

### 3. Observed Behavior
- [ ] Images show in post cards on home page
- [ ] Images DO NOT show in modal
- [ ] Modal shows title and text only
- [ ] No `<img>` tag found in modal HTML

### 4. Component Comparison
- [ ] ImagePostCard.jsx HAS image display code
- [ ] PostDetailContent.jsx MISSING image display code

## Likely Issue (Based on Code Review)

The PostDetailContent component was designed to display text post content only. It's missing:
- Image rendering logic
- Code to detect if post is an image post
- `<img>` element for displaying post images

## Next Steps After Checklist

Once you complete this checklist, share your findings and I can:
1. Add image display functionality to PostDetailContent
2. Handle different post types (image, text, link, video)
3. Use the same image loading logic from ImagePostCard
