import React, { ReactNode } from 'react';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  image?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  image = "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
}) => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={image}
          alt="Healthy Food"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center">
          <div className="text-white max-w-md px-8">
            <Link href="/" className="inline-flex items-center mb-8 text-white">
              <Leaf className="h-8 w-8 mr-2" />
              <span className="dark:text-gray-50 text-2xl font-bold">#ComeSaludable</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Link href="/" className="inline-flex items-center text-green-500">
              <Leaf className="h-8 w-8 mr-2" />
              <span className="dark:text-gray-50 text-2xl font-bold">#ComeSaludable</span>
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;