import type { User } from '../api/types';
import './UserCard.css';

interface UserCardProps {
  user: User;
  isFollowing: boolean;
  subtitle?: string;
  onFollowToggle?: () => void;
}

const UserCard = ({ user, isFollowing, subtitle, onFollowToggle }: UserCardProps) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.profilePicture ? (
          <img src={user.profilePicture} alt={user.username} />
        ) : (
          <div className="avatar-placeholder">
            {user.fullName?.charAt(0) || user.username.charAt(0)}
          </div>
        )}
      </div>
      <div className="user-info">
        <span className="user-name">{user.fullName}</span>
        <span className="user-username">@{user.username}</span>
        {subtitle && <span className="user-subtitle">{subtitle}</span>}
        <span className="user-role">
          {user.position} • {user.department}
        </span>
      </div>
      {onFollowToggle && (
        <button
          className={`follow-btn ${isFollowing ? 'following' : ''}`}
          onClick={onFollowToggle}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default UserCard;

