import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../api/types';
import { login as apiLogin } from '../api/auth';
import { getUser } from '../api/users';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    // Login now returns userId directly
    const response = await apiLogin(username, password);
    localStorage.setItem('token', response.token);

    // Fetch user details using the userId from login response
    try {
      const currentUser = await getUser(response.userId);
      setUser(currentUser);
    } catch (err) {
      // If getUser fails, create a minimal user object from login response
      // This ensures the user can still navigate after login
      console.error('Failed to fetch user details:', err);
      const minimalUser: User = {
        id: response.userId,
        username: username,
        fullName: '',
        profilePicture: null,
        position: '',
        department: '',
        isFollowing: false,
        mutualConnectionsCount: 0,
      };
      setUser(minimalUser);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
