import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImagePostCard, TextPostCard } from '../PostCard';
import {
  fetchPosts,
  loadMorePosts,
  selectPosts,
  selectPostsStatus,
  selectPostsError,
  selectLoadMoreStatus,
  selectHasMore,
  selectAfter
} from '../../features/posts/postsSlice';
import { hasValidImage } from '../../utils/redditApi';

/**
 * PostFeed Component
 * Displays a feed of Reddit posts using ImagePostCard or TextPostCard
 */
export default function PostFeed({ subreddit = 'all', sort = 'best' }) {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  const loadMoreStatus = useSelector(selectLoadMoreStatus);
  const hasMore = useSelector(selectHasMore);
  const after = useSelector(selectAfter);

  // Fetch posts when component mounts or when subreddit/sort changes
  useEffect(() => {
    dispatch(fetchPosts({ subreddit, sort }));
  }, [dispatch, subreddit, sort]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    // Don't load if already loading or no more posts
    if (loadMoreStatus === 'loading' || !hasMore || status === 'loading') {
      return;
    }

    // Check if user is near bottom of page (within 500px)
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 500) {
      dispatch(loadMorePosts({ subreddit, sort, after }));
    }
  }, [dispatch, subreddit, sort, after, loadMoreStatus, hasMore, status]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
          <p className="text-text-secondary">Loading posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchPosts({ subreddit, sort }))}
            className="bg-bg-primary text-white px-6 py-2 rounded-lg hover:opacity-80 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No posts
  if (status === 'succeeded' && posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-text-secondary">No posts found</p>
      </div>
    );
  }

  // Render posts
  return (
    <div className="w-full max-w-[908px] mx-auto">
      <div className="flex flex-col gap-6">
        {posts.map((post) => {
          // Determine which card component to use based on whether post has an image
          const hasImage = hasValidImage(post);

          return hasImage ? (
            <ImagePostCard key={post.id} post={post} />
          ) : (
            <TextPostCard key={post.id} post={post} />
          );
        })}
      </div>

      {/* Loading More Indicator */}
      {loadMoreStatus === 'loading' && (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2 mx-auto"></div>
            <p className="text-text-secondary text-sm">Loading more posts...</p>
          </div>
        </div>
      )}

      {/* No More Posts Message */}
      {!hasMore && posts.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <p className="text-text-secondary text-sm">You've reached the end!</p>
        </div>
      )}
    </div>
  );
}
