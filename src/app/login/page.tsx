'use client';

import { useState } from 'react';
import Link from 'next/link';
import InputField from '@/infrastructure/components/ui/InputField';
import AuthLayout from '@/infrastructure/layout/AuthLayout';
import { useAuth } from '@/domain/context/AuthContext';
import { redirect } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const { login } = useAuth();

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        let isValid = true;

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
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

            const response = await login.admin(email, password) as any;
            if (response.redirect) {
                redirect("/")
            }
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Log in to access your healthy meal plans"
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
                    id="password"
                    label="Password"
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

                    <div className="text-sm">
                        <a href="#" className="font-medium text-green-600 hover:text-green-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Entrar
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    No tienes cuenta?{' '}
                    <Link href="/register" className="font-medium text-green-600 hover:text-green-500">
                        Crear cuenta
                    </Link>
                </p>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                    Eres restaurant?{' '}
                    <Link href="/restaurant-login" className="font-medium text-green-600 hover:text-green-500">
                        Entrar como restaurant
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
