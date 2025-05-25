'use client';

import React from 'react';

interface PriceRangeProps {
  priceRange: 1 | 2 | 3 | 4;
  className?: string;
}

const PriceRange: React.FC<PriceRangeProps> = ({ priceRange, className = '' }) => {
  return (
    <div className={`flex ${className}`}>
      {[1, 2, 3, 4].map((level) => (
        <span 
          key={level}
          className={`text-lg font-medium ${
            level <= priceRange 
              ? 'text-amber-500' 
              : 'text-gray-300'
          }`}
        >
          $
        </span>
      ))}
    </div>
  );
};

export default PriceRange;