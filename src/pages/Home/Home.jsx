import PostFeed from '../../components/PostFeed';

/**
 * Home Page Component
 * Displays the main feed of posts from r/all
 */
export default function Home() {
  return (
    <div className="w-full">
      <PostFeed subreddit="all" sort="best" />
    </div>
  );
}
