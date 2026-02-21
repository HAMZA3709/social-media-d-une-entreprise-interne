import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register } from '../api/auth';
import { getErrorMessage, isApiError } from '../api/errorHandler';
import { POSITIONS, DEPARTMENTS } from '../api/types';
import type { RegisterFormData } from '../api/types';
import './Auth.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    fullName: '',
    position: 'JUNIOR',
    department: 'ENGINEERING',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(loginForm.username, loginForm.password);
      navigate('/feed');
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(getErrorMessage(err));
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userData = await register({
        ...registerForm,
        profilePicture: profilePicture || undefined,
      });
      setUser(userData);
      // Auto login after registration
      await login(registerForm.username, registerForm.password);
      navigate('/feed');
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(getErrorMessage(err));
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Corporate Social</h1>

        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={registerForm.username}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, username: e.target.value })
                }
                minLength={3}
                maxLength={50}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                minLength={6}
                required
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={registerForm.fullName}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, fullName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <select
                value={registerForm.position}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, position: e.target.value })
                }
              >
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Department</label>
              <select
                value={registerForm.department}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, department: e.target.value })
                }
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Profile Picture (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProfilePicture(e.target.files?.[0] || null)
                }
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

