import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../design-system/components/Input/Input';
import { Button } from '../design-system/components/Button/Button';
import { Alert } from '../design-system/components/Alert/Alert';

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
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-primary-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-sm text-neutral-600">
          Sign in to continue your wellness journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />

        <Input
          type="password"
          id="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-neutral-600">Remember me</span>
          </label>
          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Forgot password?
          </a>
        </div>

        {error && (
          <Alert variant="error">
            {error}
          </Alert>
        )}

        <Button 
          type="submit" 
          size="lg"
          className="w-full"
          loading={isLoading}
        >
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-neutral-500 font-medium">or continue with</span>
        </div>
      </div>

      {/* Google Sign In */}
      <button 
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-neutral-200 rounded-xl bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 font-medium text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="group-hover:text-neutral-900 transition-colors">
          {isLoading ? 'Signing In...' : 'Continue with Google'}
        </span>
      </button>

      {/* Footer */}
      <div className="text-center pt-3 border-t border-neutral-200">
        <p className="text-sm text-neutral-600">
          Don't have an account?{' '}
          <button 
            type="button" 
            onClick={onToggleMode}
            className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
