import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">Corporate Social</div>
        <div className="nav-links">
          <NavLink to="/feed" className={({ isActive }) => isActive ? 'active' : ''}>
            Feed
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            Profile
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => isActive ? 'active' : ''}>
            Notifications
          </NavLink>
        </div>
        <div className="nav-user">
          <span className="username">@{user?.username}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;

