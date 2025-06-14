'use client';

import React from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  editable = false,
  onChange
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const renderStar = (index: number) => {
    const starNumber = index + 1;
    const filled = editable 
      ? starNumber <= (hoverRating || rating)
      : starNumber <= rating;
    
    const starFill = filled ? 'text-amber-400' : 'text-gray-300';
    
    return (
      <svg 
        key={index}
        className={`${sizeClasses[size]} ${starFill} ${editable ? 'cursor-pointer' : ''}`}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="currentColor"
        onClick={() => editable && onChange && onChange(starNumber)}
        onMouseEnter={() => editable && setHoverRating(starNumber)}
        onMouseLeave={() => editable && setHoverRating(0)}
      >
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
      </svg>
    );
  };
  
  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;