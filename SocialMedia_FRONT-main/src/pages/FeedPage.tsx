import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFeed, likePost, unlikePost, createPost } from '../api/posts';
import { getErrorMessage, isApiError, isAuthError } from '../api/errorHandler';
import type { Post } from '../api/types';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import './Feed.css';

const FeedPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState('');
  const [posting, setPosting] = useState(false);

  const userId = user?.id;

  useEffect(() => {
    let isMounted = true;

    const loadFeed = async () => {
      if (!userId) {
        if (isMounted) {
          setLoading(false);
          setError('User ID not found. Please login again.');
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }
        const feedPosts = await getFeed(userId);
        if (isMounted) {
          setPosts(feedPosts || []);
        }
      } catch (err: unknown) {
        if (!isMounted) return;

        if (isApiError(err)) {
          if (isAuthError(err)) {
            alert(getErrorMessage(err));
            logout();
            navigate('/auth');
            return;
          }
          setError(getErrorMessage(err));
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFeed();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // Only re-run when userId changes

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Trigger re-render which will call useEffect again
    window.location.reload();
  };

  const handleLike = async (postId: number, isLiked: boolean) => {
    if (!user?.id) return;

    try {
      if (isLiked) {
        await unlikePost(postId, user.id);
      } else {
        await likePost(postId, user.id);
      }
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLikedByCurrentUser: !isLiked,
              likeCount: isLiked ? post.likeCount - 1 : post.likeCount + 1
            }
          : post
      ));
    } catch (err: unknown) {
      if (isApiError(err)) {
        alert(getErrorMessage(err));
      } else {
        alert('Failed to update like. Please try again.');
      }
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !newPostContent.trim()) return;

    try {
      setPosting(true);
      const newPost = await createPost(newPostContent, user.id);
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    } catch (err: unknown) {
      if (isApiError(err)) {
        alert(getErrorMessage(err));
      } else {
        alert('Failed to create post. Please try again.');
      }
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading feed...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="feed-container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={handleRetry} className="retry-btn">Try Again</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="feed-container">
        <div className="create-post-card">
          <h3>Create Post</h3>
          <form onSubmit={handleCreatePost}>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
            />
            <button type="submit" disabled={posting || !newPostContent.trim()}>
              {posting ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>

        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts in your feed yet.</p>
              <p>Follow some users to see their posts!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id, post.isLikedByCurrentUser)}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FeedPage;

