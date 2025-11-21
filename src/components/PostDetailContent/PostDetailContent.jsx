import { Link } from 'react-router-dom';
import { formatCount, getTimeAgo, calculateVotes } from '../../utils/formatters';
import CommentCard from '../CommentCard';

// Vote icons (same as TextPostCard)
const UpvoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-text-secondary">
    <path d="M12 4L3 15H9V20H15V15H21L12 4Z" fill="currentColor" />
  </svg>
);

const DownvoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-text-secondary">
    <path d="M12 20L21 9H15V4H9V9H3L12 20Z" fill="currentColor" />
  </svg>
);

const CommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-text-secondary">
    <path d="M21 6C21 4.9 20.1 4 19 4H5C3.9 4 3 4.9 3 6V15C3 16.1 3.9 17 5 17H17L21 21V6Z" fill="currentColor" />
  </svg>
);

/**
 * PostDetailContent Component
 * Displays the full post content and comments inside a modal
 */
export default function PostDetailContent({ post, comments, onClose }) {
  if (!post) return null;

  // Extract post data
  const {
    title,
    author,
    subreddit,
    subredditPrefixed,
    createdUtc,
    selftext,
    score,
    upvoteRatio,
    numComments
  } = post;

  // Calculate votes
  const { upvotes, downvotes } = calculateVotes(score, upvoteRatio);

  // Format time
  const timeAgo = getTimeAgo(createdUtc);

  // Get subreddit name
  const subredditName = subredditPrefixed || `r/${subreddit}`;

  return (
    <div className="bg-bg-dark rounded-[36px] overflow-hidden">
      {/* Header with breadcrumb and close */}
      <div className="flex items-center justify-between gap-2 p-8">
        <Link
          to={`/r/${subreddit}`}
          className="font-primary text-base font-medium leading-6 text-text-secondary hover:text-white transition-colors"
        >
          ← to {subredditName}
        </Link>
        <button
          onClick={onClose}
          className="font-primary text-base font-medium leading-6 text-text-secondary hover:text-white transition-colors"
        >
          Close
        </button>
      </div>

      {/* Post Title */}
      <div className="px-8 pt-5 pb-3">
        <h1 className="font-primary text-[22px] font-bold leading-[28px] text-white">
          {title}
        </h1>
      </div>

      {/* Post Metadata */}
      <div className="flex items-center px-8 pt-1 pb-3">
        <p className="font-primary text-sm font-normal leading-[21px] text-text-secondary">
          Posted by u/{author}
        </p>
        <div className="w-3" /> {/* Spacer */}
        <p className="font-primary text-sm font-normal leading-[21px] text-text-secondary">
          {timeAgo}
        </p>
      </div>

      {/* Post Content */}
      {selftext && (
        <div className="px-8 pt-1 pb-3">
          <p className="font-primary text-base font-normal leading-6 text-white whitespace-pre-wrap">
            {selftext}
          </p>
        </div>
      )}

      {/* Post Stats */}
      <div className="flex items-center flex-wrap gap-4 px-8 py-2">
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

      {/* Comments Section */}
      <div className="px-8 pt-5 pb-3">
        <h2 className="font-primary text-[22px] font-bold leading-[28px] text-white">
          Comments
        </h2>
      </div>

      {/* Comments List */}
      <div>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} depth={0} />
          ))
        ) : (
          <div className="px-8 py-4 text-center">
            <p className="text-text-secondary">No comments yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
