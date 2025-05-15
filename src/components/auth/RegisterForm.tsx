import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Salad } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '../ui/Button';
import Input from '../ui/Input';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    credentials: '',
    specialization: '',
  });
  
  const [passwordError, setPasswordError] = useState('');
  const { signUp, isLoading, error, clearError } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordError('Passwords do not match');
      } else if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      credentials: formData.credentials,
      specialization: formData.specialization,
    };
    
    await signUp(formData.email, formData.password, userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="bg-white rounded-lg shadow-card w-full max-w-md p-8 my-8 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <Salad className="text-primary-500 mb-3" size={40} />
          <h1 className="text-2xl font-bold text-neutral-800">Create an Account</h1>
          <p className="text-neutral-500 mt-1">Join NutriPro to start helping your clients</p>
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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            name="name"
            type="text"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            required
            fullWidth
          />
          
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            fullWidth
          />
          
          <Input
            id="phone"
            name="phone"
            type="tel"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            required
            fullWidth
          />
          
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            fullWidth
          />
          
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            error={passwordError}
            required
            fullWidth
          />
          
          <Input
            id="credentials"
            name="credentials"
            type="text"
            label="Credentials (Optional)"
            value={formData.credentials}
            onChange={handleChange}
            placeholder="RD, LD, PhD, etc."
            fullWidth
          />
          
          <Input
            id="specialization"
            name="specialization"
            type="text"
            label="Specialization (Optional)"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Sports Nutrition, Weight Management, etc."
            fullWidth
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            disabled={isLoading || Boolean(passwordError)}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
          
          <p className="text-center text-sm text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;