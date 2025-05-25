'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useRestaurantCrud } from '@/application/hooks/useRestaurant';

const RestaurantPreview = () => {

  const restaurantHook = useRestaurantCrud(1, 4);


  return (
    <div>
      {
        restaurantHook.loading
          ? <div className='w-full flex justify-center py-3'><Loader2 className='animate animate-spin' /></div>
          : restaurantHook.error
            ? <div className='w-full flex justify-center py-3'></div>
            : restaurantHook.list && <section className="py-16 md:py-24" id="how-it-works">
              <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Alguno de nuestros <strong>Restaurantes</strong></h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {restaurantHook.list.map((menu, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow shadow-green-300 border border-gray-100 dark:border-gray-950 transition-all duration-300 hover:shadow-md hover:border-green-200 flex flex-col items-center text-center"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-3">{menu.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{menu.about.substring(0, 50)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
      }
    </div>
  );
};

export default RestaurantPreview;