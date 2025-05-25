'use client';

import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Busy Professional',
    quote: 'NutriLife has completely transformed my eating habits. As someone with a hectic schedule, having delicious, healthy meals delivered to my door has been a game-changer!',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Fitness Enthusiast',
    quote: 'The meal plans perfectly align with my fitness goals. High protein, clean ingredients, and they actually taste amazing. Ive recommended NutriLife to everyone at my gym.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Busy Parent',
    quote: 'With two kids and a full-time job, I never had time to cook healthy meals. NutriLife has been our familys solution to eating well without the stress of meal planning.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-600" id="testimonials">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
            Don't just take our word for it — hear from the people who've transformed their eating habits with NutriLife.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 md:p-10 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto md:mx-0 border-4 border-green-100 dark:border-green-300"
                      />
                    </div>
                    <div className="md:w-2/3 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  activeIndex === index ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-800'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;