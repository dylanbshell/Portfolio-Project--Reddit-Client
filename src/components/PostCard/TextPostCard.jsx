import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCount, calculateVotes, truncateText } from '../../utils/formatters';

// Icon components
const UpvoteIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-text-secondary"
  >
    <path
      d="M12 4L3 15H9V20H15V15H21L12 4Z"
      fill="currentColor"
    />
  </svg>
);

const DownvoteIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-text-secondary"
  >
    <path
      d="M12 20L21 9H15V4H9V9H3L12 20Z"
      fill="currentColor"
    />
  </svg>
);

const CommentIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-text-secondary"
  >
    <path
      d="M21 6C21 4.9 20.1 4 19 4H5C3.9 4 3 4.9 3 6V15C3 16.1 3.9 17 5 17H17L21 21V6Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * TextPostCard Component
 * Displays a Reddit text post without an image
 */
export default function TextPostCard({ post }) {
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
    selftext
  } = post;

  // Get subreddit name with r/ prefix
  const subredditName = subredditPrefixed || `r/${subreddit}`;

  // Calculate upvotes and downvotes
  const { upvotes, downvotes } = calculateVotes(score, upvoteRatio);

  // Truncate content text (max 300 characters for display)
  const displayText = truncateText(selftext || '', 300);

  // Handle subreddit click (prevent card click propagation)
  const handleSubredditClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Link
      to={`/post/${id}`}
      className={`block p-4 transition-all duration-200 ${
        isHovered ? 'rounded-[35px]' : 'rounded-lg'
      }`}
      style={{
        background: isHovered
          ? 'linear-gradient(154deg, #413333 -83.09%, #171212 57.07%)'
          : 'transparent'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col">
        {/* Post Info - Top Row */}
        <div className="flex items-start gap-4 mb-4">
          {/* Title */}
          <div className="py-1.5">
            <h3 className="font-primary text-base font-bold leading-5 text-white">
              {title}
            </h3>
          </div>

          {/* Subreddit Name */}
          <div className="py-1.5">
            <Link
              to={`/r/${subreddit}`}
              className="font-secondary text-sm font-normal leading-[21px] text-text-secondary hover:underline"
              onClick={handleSubredditClick}
            >
              {subredditName}
            </Link>
          </div>

          {/* Stats - Right aligned */}
          <div className="flex-1 flex items-start justify-end gap-4 px-4">
            {/* Upvotes */}
            <div className="flex items-center gap-2 px-3 py-2">
              <UpvoteIcon />
              <span className="font-primary text-[13px] font-bold leading-5 text-text-secondary">
                {formatCount(upvotes)}
              </span>
            </div>

            {/* Downvotes */}
            <div className="flex items-center gap-2 px-3 py-2">
              <DownvoteIcon />
              <span className="font-primary text-[13px] font-bold leading-5 text-text-secondary">
                {formatCount(downvotes)}
              </span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-2 px-3 py-2">
              <CommentIcon />
              <span className="font-primary text-[13px] font-bold leading-5 text-text-secondary">
                {formatCount(numComments)}
              </span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="rounded-[45px] px-[50px] py-[19px]">
          <p
            className="font-secondary text-sm font-normal leading-[21px] text-text-secondary h-[124px] overflow-hidden"
            style={{
              textShadow: isHovered ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'
            }}
          >
            {displayText}
          </p>
        </div>
      </div>
    </Link>
  );
}
