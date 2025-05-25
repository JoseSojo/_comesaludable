import React from 'react';
import { ChevronUp, ChevronDown, LoaderIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  loading?: boolean; 
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  className,
  loading
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-emerald-300 fade-in ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          {
            loading 
            ? <h3 className="mt-1 text-2xl font-semibold dark:text-white"><LoaderIcon className='animate animate-spin' /></h3>
            : <h3 className="mt-1 text-2xl font-semibold dark:text-white">{value}</h3>
          }
          
          {change && (
            <div className="mt-2 flex items-center">
              {change.isPositive ? (
                <ChevronUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-red-500" />
              )}
              <span 
                className={`
                  text-sm font-medium ml-1,
                  ${change.isPositive ? "text-emerald-600" : "text-red-600"}
                `}
              >
                {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                vs last month
              </span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-lg bg-primary-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;