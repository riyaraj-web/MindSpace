import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(formData);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google OAuth flow for demo
      const googleUser = {
        email: 'user@gmail.com',
        name: 'Google User',
        provider: 'google',
        avatar: 'https://via.placeholder.com/100/4285f4/ffffff?text=G'
      };
      
      await login(googleUser);
    } catch (error) {
      console.error('Google sign-in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to continue your wellness journey</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            style={styles.signInButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>or</span>
        </div>

        <button 
          type="button"
          style={styles.googleButton}
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {isLoading ? 'Signing In...' : 'Continue with Google'}
        </button>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account?{' '}
            <button 
              type="button" 
              style={styles.linkButton}
              onClick={onToggleMode}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
    padding: '2rem'
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '2rem 1.75rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
    maxWidth: '380px',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.4rem'
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '400'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1e293b'
  },
  input: {
    padding: '0.65rem 0.875rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    background: '#f8fafc'
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#dc2626',
    padding: '0.875rem 1.25rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    textAlign: 'center'
  },
  signInButton: {
    width: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #06b6d4 50%, #14b8a6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    marginTop: '0.15rem'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.25rem 0',
    position: 'relative'
  },
  dividerText: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff',
    padding: '0 1rem',
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  googleButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    padding: '0.65rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    background: '#fff',
    color: '#1e293b',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.25rem',
    paddingTop: '1.25rem',
    borderTop: '1px solid #e2e8f0'
  },
  footerText: {
    color: '#64748b',
    fontSize: '0.875rem'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: 'inherit',
    transition: 'color 0.3s ease'
  }
};

export default Login;