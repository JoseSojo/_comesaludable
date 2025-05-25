import { Category, Environment, Type } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface CutomTagsProps {
  title: string;
  viewAllLink?: string;
  className?: string;
  loadding: boolean;
  tags: (Environment | Type | Category)[]
}

const CutomTags: React.FC<CutomTagsProps> = ({ 
  title, 
  viewAllLink, 
  className,
  tags,
  loadding
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="dark:text-white text-lg font-semibold">{title}</h3>
        {viewAllLink && (
          <a 
            href={viewAllLink} 
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 px-3 py-2 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Ver más
          </a>
        )}
      </div>
      
      <div className="space-y-4">
        {
          loadding
          ? <div className='h-full min-h-lg flex justify-center items-center'>
            <Loader2 className='animate animate-spin' />
          </div>
          : <div className='gap-3 flex flex-wrap'>
            {
              tags.map(item => (
                <span className='rounded-[20px] bg-gray-300 dark:bg-gray-900 dark:text-gray-500 text-xs px-3 py-1 font-bold text-gray-600' key={item.id}>{item.name}</span>
              ))
            }
          </div>
        }
      </div>
    </div>
  );
};

export default CutomTags;