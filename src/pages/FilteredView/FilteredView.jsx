import { useParams } from 'react-router-dom';
import PostFeed from '../../components/PostFeed';

/**
 * FilteredView Page Component
 * Displays posts from a specific subreddit
 */
export default function FilteredView() {
  const { subreddit } = useParams();

  return (
    <div className="w-full">
      {/* Subreddit Header */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">
          r/{subreddit}
        </h1>
      </div>

      {/* Post Feed */}
      <PostFeed subreddit={subreddit} sort="best" />
    </div>
  );
}
