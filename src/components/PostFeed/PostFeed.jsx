import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImagePostCard, TextPostCard } from '../PostCard';
import {
  fetchPosts,
  selectPosts,
  selectPostsStatus,
  selectPostsError
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

  // Fetch posts when component mounts or when subreddit/sort changes
  useEffect(() => {
    dispatch(fetchPosts({ subreddit, sort }));
  }, [dispatch, subreddit, sort]);

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
    </div>
  );
}
