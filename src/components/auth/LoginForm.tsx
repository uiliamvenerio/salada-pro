import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Salad } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '../ui/Button';
import Input from '../ui/Input';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleDemoAccess = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signIn('demo@nutripro.com', 'demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="bg-white rounded-lg shadow-card w-full max-w-md p-8 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <Salad className="text-primary-500 mb-3" size={40} />
          <h1 className="text-2xl font-bold text-neutral-800">Welcome to NutriPro</h1>
          <p className="text-neutral-500 mt-1">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-error-50 text-error-700 p-3 rounded-md mb-6 text-sm">
            {error}
            <button 
              className="ml-2 text-error-700 hover:text-error-900 font-medium"
              onClick={clearError}
            >
              Dismiss
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            fullWidth
          />
          
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            fullWidth
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="text-center">
            <button
              onClick={handleDemoAccess}
              className="text-sm font-medium text-secondary-600 hover:text-secondary-500 underline"
            >
              Try Demo Access
            </button>
          </div>
          
          <p className="text-center text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;