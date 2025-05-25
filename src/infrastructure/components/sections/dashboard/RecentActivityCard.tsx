import React from 'react';

export interface Activity {
  id: string;
  type: 'comment' | 'user' | 'restaurant' | 'menu';
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface RecentActivityCardProps {
  title: string;
  activities: Activity[];
  viewAllLink?: string;
  className?: string;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ 
  title, 
  activities, 
  viewAllLink, 
  className 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
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
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start slide-up">
            {activity.user?.avatar ? (
              <img 
                src={activity.user.avatar} 
                alt={activity.user.name} 
                className="h-10 w-10 rounded-full mr-3"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center text-primary-700 dark:text-primary-400 font-medium mr-3">
                {activity.user?.name.charAt(0)}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;