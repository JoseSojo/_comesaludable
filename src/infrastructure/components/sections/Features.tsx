'use client';

import React from 'react';
import { Leaf, Clock, UtensilsCrossed, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-green-500" />,
    title: 'Imaginación',
    description: 'Platillos saludables que ni los llegaste a imaginar.',
  },
  {
    icon: <Clock className="h-8 w-8 text-green-500" />,
    title: 'Ubicación',
    description: 'Ubica el restaurante más cercano a tí.',
  },
  {
    icon: <UtensilsCrossed className="h-8 w-8 text-green-500" />,
    title: 'Saludable',
    description: 'Menús nutritivos, deliciosos, y sobre todo saludables.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
    title: 'Nutricionista',
    description: 'Todo provado y aprovado por nutricionistas capacitados.',
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">¿Por qué elegirnos?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nos centramos en lo mejor, más saludable y de mejor calidad para satisfacer las necesidades de nuestro público
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-950 transition-all duration-300 hover:shadow-md hover:border-green-200 flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-green-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;