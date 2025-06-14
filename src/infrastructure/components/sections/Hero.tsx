'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import MasterMap from '../common/map/MasterMap';
import { useRestaurantCrud } from '@/application/hooks/useRestaurant';
import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';
import CustomMasterMap from '../common/map/CustomMasterMap';

const Hero = () => {

  const restaurants = useRestaurantCrud(1,0)
  const [ubications, setUbications] = useState<RestaurantsType[]>([]);

  useEffect(() => {
    (async () => {
      const result = await restaurants.getAllUbications();
      setUbications(result.response.data);
    })()
  }, [])

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
            <CustomMasterMap ubications={ubications} zoomInicial={7} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;