import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import FollowersPage from './pages/FollowersPage';
import FollowingPage from './pages/FollowingPage';
import NotificationsPage from './pages/NotificationsPage';
import type { ReactNode } from 'react';
import './App.css';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/feed" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={
        <PublicRoute>
          <AuthPage />
        </PublicRoute>
      } />
      <Route path="/feed" element={
        <ProtectedRoute>
          <FeedPage />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/followers" element={
        <ProtectedRoute>
          <FollowersPage />
        </ProtectedRoute>
      } />
      <Route path="/following" element={
        <ProtectedRoute>
          <FollowingPage />
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <NotificationsPage />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

