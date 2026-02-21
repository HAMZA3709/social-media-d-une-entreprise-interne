import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../api/users';
import { getUserPosts } from '../api/posts';
import { getErrorMessage, isApiError, isAuthError } from '../api/errorHandler';
import type { UserProfile, Post } from '../api/types';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import './Profile.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = user?.id;

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (!userId) {
        if (isMounted) {
          setLoading(false);
          setError('User not found. Please login again.');
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }
        const [profileData, userPosts] = await Promise.all([
          getUserProfile(userId, userId),
          getUserPosts(userId, userId),
        ]);
        if (isMounted) {
          setProfile(profileData);
          setPosts(userPosts);
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

    loadProfile();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading profile...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="profile-container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={handleRetry} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="profile-container">
          <div className="error-message">
            <p>Profile not found</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt={profile.username} />
            ) : (
              <div className="avatar-placeholder">
                {profile.fullName?.charAt(0) || profile.username.charAt(0)}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1>{profile.fullName}</h1>
            <p className="username">@{profile.username}</p>
            <p className="role">
              {profile.position} • {profile.department}
            </p>
          </div>
        </div>

        <div className="profile-stats">
          <Link to="/followers" className="stat-item">
            <span className="stat-number">{profile.followerCount}</span>
            <span className="stat-label">Followers</span>
          </Link>
          <Link to="/following" className="stat-item">
            <span className="stat-number">{profile.followingCount}</span>
            <span className="stat-label">Following</span>
          </Link>
          <div className="stat-item">
            <span className="stat-number">{posts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
        </div>

        <div className="profile-posts">
          <h2>Posts</h2>
          {posts.length === 0 ? (
            <div className="no-posts">No posts yet</div>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

