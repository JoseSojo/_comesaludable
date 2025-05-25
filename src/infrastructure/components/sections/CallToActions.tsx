import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-green-700 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para comenzar su viaje saludable?</h2>
          <p className="text-xl mb-8 text-green-50">
            Únase a miles de clientes satisfechos que disfrutan de comidas nutritivas y deliciosas sin complicaciones.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href={"/login/restaurant"} className="border border-white-600 text-white-600 hover:bg-white hover:text-green-700 font-medium px-6 py-3 rounded-md transition-colors duration-300 self-start">
              Soy Restaurante
            </Link>
            <Link
              href="/register"
              className="bg-white text-green-600 hover:bg-green-50 font-medium px-8 py-3 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              Crear cuenta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href={"/register"} className="border border-white-600 text-white-600 hover:bg-white hover:text-green-700 font-medium px-6 py-3 rounded-md transition-colors duration-300 self-start">
              Iniciar sesión
            </Link>

          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold">1M+</p>
              <p className="text-green-100">Menus</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">20k+</p>
              <p className="text-green-100">Restaurantes</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">100+</p>
              <p className="text-green-100">Clientes</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">4.9</p>
              <p className="text-green-100">Comentarios</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;