import React, { FormEvent, useState } from 'react';
import { Card, CardContent } from '../../restaurant/Card';
import { Comment } from '@prisma/client';
import StarRating from './Ratting';
import { useCommentCrud } from '@/application/hooks/interactions/useComment';
import { useAuth } from '@/domain/context/AuthContext';
import { MenuType } from '@/infrastructure/interface/menu.type';
import toast from 'react-hot-toast';

interface ReviewsSectionProps {
  reviews: Comment[];
  entity: MenuType
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews,entity }) => {
  const { user } = useAuth()
  // Calculate average rating
  const [stars, setStars] = useState(5);
  const [content, setContent] = useState("");
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

  const HandelSubmit = (e: FormEvent) => {
    e.preventDefault();

    (async () => {
      const adapter = useCommentCrud(0,0,{});
      const response = await adapter.createComent({ comment:content, id:entity.id, stars, userId:user.id });
      return toast.success(response.message);
    })()

  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Rating summary */}
        <div className="lg:col-span-3 ">
          <Card className='w-[100%] lg:w-[50%] m-auto'>
            <CardContent className="p-6 w-full">
              <h2 className='text-xl font-bold text-center'>Dejanos tu opinión:</h2>
              <form className='' onSubmit={HandelSubmit}>
                <textarea onChange={(e) => setContent(e.target.value)} className='border border-gray-300 rounded dark:border-gray-700 w-full p-2 min-h-[50px] max-h-[100px]'></textarea>
                <div className='flex justify-end items-center gap-5'>
                  <StarRating onChange={setStars} value={stars}  />
                  <button type='submit' className='bg-emerald-400'>enviar</button>
                </div>
              </form>
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