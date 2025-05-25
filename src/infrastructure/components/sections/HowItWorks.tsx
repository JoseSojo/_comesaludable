'use client';

import React from 'react';
import { MousePointer, ShoppingBag, ChefHat, Truck } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: <MousePointer className="h-7 w-7 text-white" />,
    title: 'Busqueda',
    description: 'explora en la alta gama de menús y restaurantes disponibles.',
    color: 'bg-green-500',
  },
  {
    icon: <ShoppingBag className="h-7 w-7 text-white" />,
    title: 'Seleción',
    description: 'Selecionar y ubicar el restaurante que desees visitar.',
    color: 'bg-green-600',
  },
  {
    icon: <ChefHat className="h-7 w-7 text-white" />,
    title: 'Visitar',
    description: 'Visita el restaurant, ubica sus redes sociales en el perfil del restaurant.',
    color: 'bg-green-700',
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Como funciona</h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
            Busca, seleciona, visita
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg relative`}>
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-bold shadow-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <div className="w-full max-w-6xl bg-white dark:bg-gray-950 rounded-2xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
                <h3 className="dark:text-gray-50 text-2xl font-bold  dark:text-whitetext-gray-900 mb-4">Comience hoy mismo su viaje saludable</h3>
                <p className="text-gray-600 mb-6">
                  Registrate justo ahora y comienza a explorar
                </p>
                <div className="flex gap-3">
                  <Link href={"/register"} className="bg-green-500 hover:bg-green-600 text-white dark:text-white font-medium px-6 py-3 rounded-md transition-colors duration-300 self-start">
                    Crear cuenta
                  </Link>
                  <Link href={"/register"} className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-medium px-6 py-3 rounded-md transition-colors duration-300 self-start">
                    Iniciar sesión
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Prepared healthy meals"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;