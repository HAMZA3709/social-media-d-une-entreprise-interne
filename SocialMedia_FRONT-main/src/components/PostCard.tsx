import type { Post } from '../api/types';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  onLike?: () => void;
}

const PostCard = ({ post, onLike }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle case where author might be undefined
  const author = post.author || {
    username: 'Unknown',
    fullName: 'Unknown User',
    profilePicture: null,
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author-avatar">
          {author.profilePicture ? (
            <img src={author.profilePicture} alt={author.username} />
          ) : (
            <div className="avatar-placeholder">
              {author.fullName?.charAt(0) || author.username?.charAt(0) || '?'}
            </div>
          )}
        </div>
        <div className="post-author-info">
          <span className="author-name">{author.fullName || 'Unknown User'}</span>
          <span className="author-username">@{author.username || 'unknown'}</span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post image" className="post-image" />
        )}
      </div>

      <div className="post-footer">
        <button
          className={`like-btn ${post.isLikedByCurrentUser ? 'liked' : ''}`}
          onClick={onLike}
        >
          {post.isLikedByCurrentUser ? '❤️' : '🤍'} {post.likeCount}
        </button>
        <span className="comment-count">💬 {post.commentCount}</span>
      </div>
    </div>
  );
};

export default PostCard;

