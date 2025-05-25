import React from 'react';
import { Card, CardContent } from '../../restaurant/Card';
import StarRating from '../../restaurant/StarRating';
import { Comment } from '@prisma/client';

interface ReviewsSectionProps {
  reviews: Comment[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  // Calculate average rating
  const averageRating = 10; //reviews.length > 0
    // ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    // : 0;
  
  // Count ratings by star level
//   const ratingCounts = reviews.reduce(
//     (counts, review) => {
//       counts[review.rating] = (counts[review.rating] || 0) + 1;
//       return counts;
//     },
//     {} as Record<number, number>
//   );
  
  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Reviews</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Rating summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  {averageRating.toFixed(1)}
                </h3>
                <div className="flex justify-center mb-2">
                  <StarRating rating={averageRating} size="md" />
                </div>
                <p className="text-gray-500 text-sm">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = 0;
                  const percentage = reviews.length > 0
                    ? Math.round((count / reviews.length) * 100)
                    : 0;
                    
                  return (
                    <div key={rating} className="flex items-center">
                      <div className="flex-shrink-0 w-6 text-sm text-gray-600 font-medium">
                        {rating}★
                      </div>
                      <div className="flex-1 ml-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-3 w-12 text-xs text-right text-gray-500">
                        {percentage}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Reviews list */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ReviewCardProps {
  review: Comment;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            {/* {review.avatar ? (
              <img 
                src={review.avatar} 
                alt={review.author} 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-medium text-lg">
                  {review.author.charAt(0)}
                </span>
              </div>
            )} */}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">Nombre</h4>
                <div className="flex items-center mt-1">
                  <StarRating rating={review.stars} size="sm" />
                  <span className="ml-2 text-xs text-gray-500">
                    {/* {formatDate(review.date)} */}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="mt-3 text-gray-600">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewsSection;