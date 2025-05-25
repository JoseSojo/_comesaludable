'use client';

import React from 'react';
import { Leaf, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import constants from '@/infrastructure/constants';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <Leaf className="h-7 w-7 text-green-500 group-hover:text-green-600 transition-colors" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">{constants.app.name}</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-200 mb-4">
              Comidas sanas y deliciosas a domicilio. Hacemos que comer bien sea fácil y agradable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 dark:text-gray-200 hover:text-green-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-200 hover:text-green-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-200 hover:text-green-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Menu</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#meals" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Soporte</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  Politicas y privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Portal Access</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  Usuario
                </Link>
              </li>
              <li>
                <Link href="/login/restaurant" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors">
                  Restaurante
                </Link>
              </li>
              <li>
                <Link href="/login/administration" className="text-gray-600 dark:text-gray-200 hover:text-green-500 transition-colors text-sm">
                  Administración
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 dark:text-gray-200 text-sm">
            &copy; {new Date().getFullYear()} NutriLife. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;