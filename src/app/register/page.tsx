'use client';

import InputField from '@/infrastructure/components/ui/InputField';
import AuthLayout from '@/infrastructure/layout/AuthLayout';
import { Link } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    email?: string; 
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const validateForm = () => {
    const newErrors: { 
      email?: string; 
      username?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      redirect('/');
    }
  };

  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Join NutriLife and start your healthy food journey"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={errors.email}
        />

        <InputField
          id="username"
          label="Username"
          type="text"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          error={errors.username}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={errors.password}
        />

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          error={errors.confirmPassword}
        />

        <div className="flex items-center">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
            required
          />
          <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Privacy Policy
            </a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 1C5.028 1 1 5.028 1 10c0 4.79 3.752 8.912 8.52 9.502.62.114.845-.27.845-.6 0-.298-.01-1.085-.015-2.13-3.47.757-4.205-1.67-4.205-1.67-.567-1.443-1.385-1.827-1.385-1.827-1.132-.772.085-.757.085-.757 1.253.088 1.912 1.286 1.912 1.286 1.114 1.908 2.924 1.357 3.635 1.037.113-.807.435-1.36.793-1.672-2.77-.315-5.684-1.385-5.684-6.16 0-1.36.485-2.475 1.285-3.35-.13-.313-.558-1.573.12-3.285 0 0 1.047-.337 3.43 1.278.995-.278 2.062-.417 3.122-.42 1.06.003 2.128.143 3.123.42 2.38-1.615 3.428-1.278 3.428-1.278.68 1.712.25 2.972.122 3.285.8.875 1.285 1.99 1.285 3.35 0 4.788-2.92 5.842-5.698 6.15.45.387.85 1.152.85 2.32 0 1.675-.015 3.025-.015 3.438 0 .335.225.72.855.598C15.253 18.91 19 14.79 19 10c0-4.972-4.028-9-9-9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;