import { useState } from 'react';
import { formatCount, getTimeAgo } from '../../utils/formatters';

// Default user icon placeholder
const DefaultUserIcon = () => (
  <div className="w-10 h-10 rounded-full bg-bg-primary flex items-center justify-center">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-text-secondary"
    >
      <path
        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

// Upvote Icon
const UpvoteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-text-secondary"
  >
    <path
      d="M10 3.125L3.125 12.5H7.5V15.625H12.5V12.5H16.875L10 3.125Z"
      fill="currentColor"
    />
  </svg>
);

// Downvote Icon
const DownvoteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-text-secondary"
  >
    <path
      d="M10 16.875L16.875 7.5H12.5V4.375H7.5V7.5H3.125L10 16.875Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * CommentCard Component
 * Displays a Reddit comment with user info, content, and vote counts
 * Supports nested replies up to 2 levels deep
 */
export default function CommentCard({ comment, depth = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract comment data
  const {
    author,
    body,
    score,
    createdUtc,
    replies = []
  } = comment;

  // Calculate vote breakdown (approximation since Reddit doesn't provide exact counts)
  // We'll show the score as upvotes and a small portion as downvotes for display
  const upvotes = score > 0 ? score : 0;
  const downvotes = score > 0 ? Math.floor(score * 0.1) : Math.abs(score);

  // Format timestamp
  const timeAgo = getTimeAgo(createdUtc);

  // Check if comment has replies
  const hasReplies = replies && replies.length > 0;

  // Calculate indentation based on depth
  // Level 0: px-8 (32px), Level 1: px-8, Level 2: pl-[68px] (68px left padding)
  const paddingClass = depth === 0
    ? 'px-8'
    : depth === 1
    ? 'px-8'
    : 'pl-[68px] pr-8';

  return (
    <>
      {/* Main Comment */}
      <div className={`flex gap-3 items-start py-4 ${paddingClass}`}>
        {/* User Icon */}
        <div className="relative w-10 h-10 rounded-full shrink-0">
          <DefaultUserIcon />
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Username and Timestamp */}
          <div className="flex items-start gap-3 mb-1">
            <p className="font-primary text-sm font-bold leading-[21px] text-white">
              {author}
            </p>
            <p className="font-primary text-sm font-normal leading-[21px] text-text-secondary">
              {timeAgo}
            </p>
          </div>

          {/* Comment Body */}
          <div className="mb-2">
            <p className="font-primary text-sm font-normal leading-[21px] text-white">
              {body}
            </p>
          </div>

          {/* Vote Counts */}
          <div className="flex items-center gap-9 pt-2">
            {/* Upvotes */}
            <div className="flex items-center gap-2">
              <UpvoteIcon />
              <span className="font-primary text-sm font-normal leading-[21px] text-text-secondary">
                {formatCount(upvotes)}
              </span>
            </div>

            {/* Downvotes */}
            <div className="flex items-center gap-2">
              <DownvoteIcon />
              <span className="font-primary text-sm font-normal leading-[21px] text-text-secondary">
                {formatCount(downvotes)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nested Replies (only render if depth < 2) */}
      {depth < 2 && replies && replies.length > 0 && (
        <div>
          {replies.map((reply, index) => (
            <CommentCard
              key={reply.id || index}
              comment={reply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      {/* Show indicator for hidden deeper replies */}
      {depth === 1 && comment.moreRepliesCount && comment.moreRepliesCount > 0 && (
        <div className="pl-[68px] pr-8 py-2">
          <p className="text-text-secondary text-sm italic">
            {comment.moreRepliesCount} more {comment.moreRepliesCount === 1 ? 'reply' : 'replies'}...
          </p>
        </div>
      )}
    </>
  );
}
