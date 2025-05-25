'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import constants from "@/infrastructure/constants";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-green-200 to-white dark:from-green-900 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4 md:mb-6">
              Come
              <span className="text-green-500">Saludable</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-100 mb-8">
              Disfruta de los mejores y más saludables platillos, de diversos restaurantes. 
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/register" 
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300 flex items-center justify-center"
              >
                Crear cuenta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/login" 
                className="bg-white hover:bg-gray-100 text-gray-800 font-medium px-6 py-3 rounded-md border border-gray-300 transition-colors duration-300 flex items-center justify-center"
              >
                Entrar
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
              <img 
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Healthy meal with fresh vegetables" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="bg-green-500 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">4.9/5 Calificación</p>
                  <p className="text-sm text-gray-600">De 2,000+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;