import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCount, calculateVotes } from '../../utils/formatters';

// Fallback placeholder for missing images
const PlaceholderImage = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-bg-primary rounded-[45px]">
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-text-secondary opacity-50"
    >
      <path
        d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

/**
 * ImagePostCard Component
 * Displays a Reddit post with an image thumbnail
 */
export default function ImagePostCard({ post }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Extract post data
  const {
    id,
    title,
    subreddit,
    subredditPrefixed,
    score,
    upvoteRatio,
    numComments,
    preview,
    thumbnail,
    url
  } = post;

  // Get subreddit name with r/ prefix
  const subredditName = subredditPrefixed || `r/${subreddit}`;

  // Calculate upvotes and downvotes
  const { upvotes, downvotes } = calculateVotes(score, upvoteRatio);

  // Get image URL (prefer preview, fallback to thumbnail)
  const getImageUrl = () => {
    // Check for preview image (high quality)
    if (preview && preview.images && preview.images[0]) {
      const imageUrl = preview.images[0].source.url;
      // Reddit escapes the URL, need to unescape it
      return imageUrl.replace(/&amp;/g, '&');
    }

    // Fallback to thumbnail if it's a valid image URL
    if (thumbnail && thumbnail !== 'self' && thumbnail !== 'default' && thumbnail !== 'nsfw' && thumbnail !== 'spoiler') {
      return thumbnail;
    }

    return null;
  };

  const imageUrl = getImageUrl();
  const hasValidImage = imageUrl && !imageError;

  // Handle subreddit click (prevent card click propagation)
  const handleSubredditClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Link
      to={`/post/${id}`}
      className={`block p-4 rounded-lg transition-all duration-200 ${
        isHovered ? 'rounded-[35px]' : 'rounded-lg'
      }`}
      style={{
        background: isHovered
          ? 'linear-gradient(130deg, #171212 55.96%, #413333 116.73%)'
          : 'transparent'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Post Info - Left Side */}
        <div className="flex flex-col gap-4 h-[161px] w-[573px] shrink-0">
          {/* Post Header */}
          <div className="flex flex-col gap-1">
            {/* Post Title */}
            <h3 className="font-secondary text-base font-bold leading-5 text-white">
              {title}
            </h3>

            {/* Subreddit Name */}
            <Link
              to={`/r/${subreddit}`}
              className="font-secondary text-sm font-normal leading-[21px] text-text-secondary hover:underline"
              onClick={handleSubredditClick}
            >
              {subredditName}
            </Link>
          </div>

          {/* Post Stats */}
          <div className="bg-bg-primary h-8 rounded-lg px-4 flex items-center justify-center max-w-[480px] min-w-[84px]">
            <p className="font-secondary text-sm font-medium leading-[21px] text-white whitespace-nowrap">
              {formatCount(upvotes)} upvotes | {formatCount(downvotes)} downvotes | {formatCount(numComments)} comments
            </p>
          </div>
        </div>

        {/* Post Image - Right Side */}
        <div className="relative h-[161px] flex-1 rounded-[45px] overflow-hidden min-w-0">
          {hasValidImage ? (
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-[45px]"
              onError={() => setImageError(true)}
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
      </div>
    </Link>
  );
}
