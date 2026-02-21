import Layout from '../components/Layout';
import './Notifications.css';

// Note: The API doesn't have a notifications endpoint yet
// This is a placeholder UI

const NotificationsPage = () => {
  // Placeholder notifications data
  const notifications = [
    { id: 1, type: 'follow', message: 'New follower notification will appear here', time: 'Just now' },
  ];

  return (
    <Layout>
      <div className="notifications-container">
        <h1>Notifications</h1>

        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="notification-placeholder">
              <div className="notification-icon">🔔</div>
              <p>Notification feature coming soon!</p>
              <p className="notification-subtext">
                Follow notifications and other updates will appear here once the backend endpoint is available.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;

