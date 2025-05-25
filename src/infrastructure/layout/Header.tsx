'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, PersonStanding, UserCircle, BarChart2, Apple } from 'lucide-react';
import Link from 'next/link';
import constants from "@/infrastructure/constants";
import { useAuth } from '@/domain/context/AuthContext';
import { redirect } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { auth, admin, restaurant, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const LogOut = async () => {
    await logout(),
    redirect("/")
  }
  // const isAuthPage = ['/login', '/register', '/restaurant-login', '/admin-login'].includes(location.pathname);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 dark:text-gray-200 shadow-md py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            onClick={closeMenu}
          >
            <Leaf className="h-8 w-8 text-green-500 group-hover:text-green-600 transition-colors" />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-300">{constants.app.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="dark:text-gray-400 text-gray-700 hover:text-green-500 transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/menus"
              className="dark:text-gray-400 text-gray-700 hover:text-green-500 transition-colors"
            >
              Menus
            </Link>
            <Link
              href="/restaurantes"
              className="dark:text-gray-400 text-gray-700 hover:text-green-500 transition-colors"
            >
              Restaurantes
            </Link>

            {auth ? (
              <>
                
                {
                  admin
                    ? <Link
                      href="/dashboard"
                      className="text-gray-700 hover:bg-green-600 p-2 rounded-md hover:text-white transition-colors"
                    >
                      <BarChart2 />
                    </Link>
                    : !restaurant && <Link
                      href="/profile"
                      className="text-gray-700 hover:bg-green-600 p-2 rounded-md hover:text-white transition-colors"
                    >
                      <UserCircle />
                    </Link>
                }
                {
                  restaurant && <Link
                    href="/restaurant"
                    className="text-gray-700 hover:bg-green-600 p-2 rounded-md hover:text-white transition-colors"
                  >
                    <Apple />
                  </Link>
                }



                <button
                  onClick={LogOut}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-green-500 hover:text-green-600 font-medium transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="text-green-500 border boder-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-md transition-colors"
                >
                  Registro
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 bg-white absolute top-full left-0 right-0 shadow-md">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                href="/"
                className="dark:text-gray-400 text-gray-700 hover:text-green-500 transition-colors py-2"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/#meals"
                className="dark:text-gray-400 text-gray-700 hover:text-green-500 transition-colors py-2"
                onClick={closeMenu}
              >
                Meals
              </Link>
              <Link
                href="/#how-it-works"
                className="dark:text-gray-400 text-gray-700 hover:text-green-500 transition-colors py-2"
                onClick={closeMenu}
              >
                How It Works
              </Link>
              <Link
                href="/#testimonials"
                className="dark:text-gray-400 text-gray-700 hover:text-green-500 transition-colors py-2"
                onClick={closeMenu}
              >
                Testimonials
              </Link>

              {/* {user ? (
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link 
                    href="/login" 
                    className="text-green-500 hover:text-green-600 font-medium transition-colors py-2"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-center"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )} */}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;