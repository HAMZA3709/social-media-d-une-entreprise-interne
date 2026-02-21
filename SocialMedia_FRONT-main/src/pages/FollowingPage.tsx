import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserFollowing, unfollowUser } from '../api/users';
import { getErrorMessage, isApiError, isAuthError } from '../api/errorHandler';
import type { FollowingItem } from '../api/types';
import Layout from '../components/Layout';
import UserCard from '../components/UserCard';
import './Connections.css';

const FollowingPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [following, setFollowing] = useState<FollowingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = user?.id;

  useEffect(() => {
    let isMounted = true;

    const loadFollowing = async () => {
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
        const data = await getUserFollowing(userId);
        if (isMounted) {
          setFollowing(data);
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

    loadFollowing();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleUnfollow = async (targetUserId: number) => {
    if (!user?.id) return;

    try {
      await unfollowUser(user.id, targetUserId);
      setFollowing(following.filter(f => f.user.id !== targetUserId));
    } catch (err: unknown) {
      if (isApiError(err)) {
        alert(getErrorMessage(err));
      } else {
        alert('Failed to unfollow. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading following...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="connections-container">
          <h1>Following</h1>
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
        <h1>Following</h1>

        {following.length === 0 ? (
          <div className="no-connections">
            <p>You are not following anyone yet</p>
          </div>
        ) : (
          <div className="connections-list">
            {following.map((item) => (
              <UserCard
                key={item.user.id}
                user={item.user}
                isFollowing={true}
                subtitle={`Following since ${new Date(item.followingSince).toLocaleDateString()}`}
                onFollowToggle={() => handleUnfollow(item.user.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FollowingPage;
