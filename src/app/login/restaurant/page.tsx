'use client'

import { useAuth } from '@/domain/context/AuthContext';
import AuthLayout from '@/infrastructure/layout/AuthLayout';
import { redirect } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

const RestaurantLogin = () => {
  const [code, setCode] = useState(['', '', '', '', '', '', ``]);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { login } = useAuth();

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 7);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 7);

    if (pastedData.length) {
      const newCode = [...code].map((_, index) => pastedData[index] || '');
      setCode(newCode);

      // Focus the next empty input or the last input if all are filled
      const nextEmptyIndex = newCode.findIndex(c => !c);
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const completeCode = code.join('');

    if (completeCode.length !== 7) {
      setError('Please enter all 6 digits');
      return;
    }

    (async () => {
      alert(completeCode);
      alert(`completeCode, 2`);
      await login.restaurant(completeCode);
      redirect('/');
    })()
  };

  return (
    <AuthLayout
      title="Restaurant Partner Login"
      subtitle="Enter your 6-digit restaurant code to access your dashboard"
      image="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your 6-digit code
          </label>
          <div className="flex justify-center space-x-2 mb-1">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xl"
                autoFocus={index === 0}
              />
            ))}
          </div>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          <p className="text-xs text-gray-500 mt-2">
            The code was provided to your restaurant in the welcome package
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-lg"
          >
            Access Dashboard
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Having trouble with your code?{' '}
          <a href="#" className="font-medium text-green-600 hover:text-green-500">
            Contact support
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RestaurantLogin;