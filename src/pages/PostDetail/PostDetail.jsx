import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal';
import PostDetailContent from '../../components/PostDetailContent';
import {
  fetchPost,
  selectCurrentPost,
  selectDisplayedComments,
  selectCurrentPostStatus,
  selectCurrentPostError,
  clearCurrentPost
} from '../../features/currentPost/currentPostSlice';

/**
 * PostDetail Page Component
 * Displays a post with comments in a modal overlay
 */
export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector(selectCurrentPost);
  const comments = useSelector(selectDisplayedComments);
  const status = useSelector(selectCurrentPostStatus);
  const error = useSelector(selectCurrentPostError);

  // Fetch post when component mounts or postId changes
  useEffect(() => {
    if (postId && post && post.id === postId) {
      // Post already loaded
      return;
    }

    if (postId) {
      // Extract subreddit from post if we have it, otherwise use a placeholder
      // Reddit API needs subreddit for the endpoint, but we can get it from the post data
      // For now, we'll fetch without subreddit and rely on the API to handle it
      // Note: This might need adjustment based on how your API wrapper handles it
      dispatch(fetchPost({ subreddit: 'all', postId }));
    }
  }, [dispatch, postId, post]);

  // Clear post when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch]);

  // Handle modal close - navigate back
  const handleClose = () => {
    navigate(-1);
  };

  // Handle retry on error
  const handleRetry = () => {
    if (postId) {
      dispatch(fetchPost({ subreddit: 'all', postId }));
    }
  };

  return (
    <Modal isOpen={true} onClose={handleClose} maxWidth="960px">
      {status === 'loading' && (
        <div className="bg-bg-dark rounded-[36px] p-8 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <p className="text-text-secondary">Loading post...</p>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div className="bg-bg-dark rounded-[36px] p-8 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="bg-bg-primary text-white px-6 py-2 rounded-lg hover:opacity-80 transition-opacity"
              >
                Retry
              </button>
              <button
                onClick={handleClose}
                className="bg-bg-primary text-white px-6 py-2 rounded-lg hover:opacity-80 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {status === 'succeeded' && post && (
        <PostDetailContent
          post={post}
          comments={comments}
          onClose={handleClose}
        />
      )}
    </Modal>
  );
}
