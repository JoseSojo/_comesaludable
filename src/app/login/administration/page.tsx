'use client';

import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { redirect } from 'next/navigation';
import AuthLayout from '@/infrastructure/layout/AuthLayout';
import InputField from '@/infrastructure/components/ui/InputField';
import { useAuth } from '@/domain/context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    let isValid = true;

    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const response = await login.admin(username, password) as any;
      if(response.redirect) {
        redirect("/")
      }
    }
  };

  return (
    <AuthLayout 
      title="Admin Access" 
      subtitle="Enter your credentials to access the administration panel"
      image="https://images.pexels.com/photos/5876432/pexels-photo-5876432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    >
      <div className="flex justify-center mb-8">
        <div className="bg-green-100 p-3 rounded-full">
          <Lock className="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="username"
          label="Admin Username"
          type="text"
          placeholder="admin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          error={errors.username}
        />

        <InputField
          id="password"
          label="Admin Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
          >
            Access Admin Panel
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;