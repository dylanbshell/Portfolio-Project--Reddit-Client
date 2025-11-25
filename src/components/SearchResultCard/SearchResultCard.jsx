import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCount, getTimeAgo } from '../../utils/formatters';
import { getPostImageUrl } from '../../utils/redditApi';

// Placeholder for missing thumbnails
const PlaceholderThumbnail = () => (
  <div className="w-[70px] h-[70px] rounded-[20px] bg-bg-primary flex items-center justify-center">
    <svg
      width="40"
      height="40"
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
 * SearchResultCard Component
 * Displays a search result for posts, communities, or people
 */
export default function SearchResultCard({ result, type }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Determine card content based on type
  if (type === 'posts') {
    const {
      id,
      title,
      subreddit,
      subredditPrefixed,
      author,
      score,
      numComments,
      createdUtc,
      thumbnail
    } = result;

    const imageUrl = getPostImageUrl(result);
    const timeAgo = getTimeAgo(createdUtc);
    const subredditName = subredditPrefixed || `r/${subreddit}`;

    return (
      <Link
        to={`/post/${id}`}
        className={`block bg-bg-dark transition-all duration-200 ${
          isHovered ? 'rounded-[15px]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-4 px-4 py-3">
          {/* Thumbnail */}
          <div className="relative w-[70px] h-[70px] rounded-[20px] shrink-0 overflow-hidden">
            {imageUrl && !imageError ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover rounded-[20px]"
                onError={() => setImageError(true)}
              />
            ) : (
              <PlaceholderThumbnail />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 h-[70px] flex flex-col justify-center">
            {/* Title */}
            <h3 className="font-primary text-base font-medium leading-6 text-white mb-0.5 truncate">
              {title}
            </h3>

            {/* Stats */}
            <p className="font-primary text-sm font-normal leading-[21px] text-text-secondary">
              {formatCount(numComments)} comments • {formatCount(score)} upvotes
            </p>

            {/* Metadata */}
            <p className="font-primary text-sm font-normal leading-[21px] text-text-secondary">
              {subredditName} • Posted by {author} • {timeAgo}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  if (type === 'communities') {
    const {
      id,
      name,
      displayNamePrefixed,
      subscribers,
      publicDescription,
      iconImg
    } = result;

    const displayName = displayNamePrefixed || `r/${name}`;

    return (
      <Link
        to={`/r/${name}`}
        className={`block bg-bg-dark transition-all duration-200 ${
          isHovered ? 'rounded-[15px]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-4 px-4 py-3">
          {/* Icon */}
          <div className="relative w-[70px] h-[70px] rounded-[20px] shrink-0 overflow-hidden">
            {iconImg ? (
              <img
                src={iconImg}
                alt={name}
                className="w-full h-full object-cover rounded-[20px]"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <PlaceholderThumbnail />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 h-[70px] flex flex-col justify-center">
            {/* Name */}
            <h3 className="font-primary text-base font-medium leading-6 text-white mb-0.5 truncate">
              {displayName}
            </h3>

            {/* Subscribers */}
            <p className="font-primary text-sm font-normal leading-[21px] text-text-secondary">
              {formatCount(subscribers)} subscribers
            </p>

            {/* Description */}
            {publicDescription && (
              <p className="font-primary text-sm font-normal leading-[21px] text-text-secondary truncate">
                {publicDescription}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (type === 'people') {
    const {
      id,
      name,
      iconImg,
      linkKarma,
      commentKarma
    } = result;

    const totalKarma = (linkKarma || 0) + (commentKarma || 0);

    return (
      <div className="block bg-bg-dark cursor-default">
        <div className="flex items-start gap-4 px-4 py-3">
          {/* Avatar */}
          <div className="relative w-[70px] h-[70px] rounded-[20px] shrink-0 overflow-hidden">
            {iconImg ? (
              <img
                src={iconImg}
                alt={name}
                className="w-full h-full object-cover rounded-[20px]"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <PlaceholderThumbnail />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 h-[70px] flex flex-col justify-center">
            {/* Username */}
            <h3 className="font-primary text-base font-medium leading-6 text-white mb-0.5 truncate">
              u/{name}
            </h3>

            {/* Karma */}
            <p className="font-primary text-sm font-normal leading-[21px] text-text-secondary">
              {formatCount(totalKarma)} karma
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
