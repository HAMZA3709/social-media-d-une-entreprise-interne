import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserFollowers, followUser, unfollowUser } from '../api/users';
import { getErrorMessage, isApiError, isAuthError } from '../api/errorHandler';
import type { FollowerItem } from '../api/types';
import Layout from '../components/Layout';
import UserCard from '../components/UserCard';
import './Connections.css';

const FollowersPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [followers, setFollowers] = useState<FollowerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = user?.id;

  useEffect(() => {
    let isMounted = true;

    const loadFollowers = async () => {
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
        const data = await getUserFollowers(userId);
        if (isMounted) {
          setFollowers(data);
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

    loadFollowers();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleFollowToggle = async (targetUserId: number, isFollowing: boolean) => {
    if (!user?.id) return;

    try {
      if (isFollowing) {
        await unfollowUser(user.id, targetUserId);
      } else {
        await followUser(user.id, targetUserId);
      }
      setFollowers(followers.map(f =>
        f.user.id === targetUserId
          ? { ...f, isFollowingBack: !isFollowing }
          : f
      ));
    } catch (err: unknown) {
      if (isApiError(err)) {
        alert(getErrorMessage(err));
      } else {
        alert('Failed to update follow status. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading followers...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="connections-container">
          <h1>Followers</h1>
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
      <div className="connections-container">
        <h1>Followers</h1>

        {followers.length === 0 ? (
          <div className="no-connections">
            <p>No followers yet</p>
          </div>
        ) : (
          <div className="connections-list">
            {followers.map((follower) => (
              <UserCard
                key={follower.user.id}
                user={follower.user}
                isFollowing={follower.isFollowingBack}
                subtitle={`Followed you on ${new Date(follower.followedAt).toLocaleDateString()}`}
                onFollowToggle={() => handleFollowToggle(follower.user.id, follower.isFollowingBack)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FollowersPage;

