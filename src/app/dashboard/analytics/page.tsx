'use client'

import React from 'react';
import { Calendar, Download } from 'lucide-react';

const Analytics: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('es-VE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="dark:text-gray-50 text-2xl font-bold dark:text-white">Análisis</h1>
          <p className="text-gray-500 dark:text-gray-400">
            En desrrollo
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Calendar className="h-4 w-4" />
            <span>{currentDate}</span>
          </div>
          <button className="btn btn-secondary flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 fade-in">
          <h3 className="text-lg font-semibold mb-2">Average Order Value</h3>
          <p className="text-3xl font-bold text-primary-600">$32.45</p>
          <p className="text-sm text-gray-500 mt-1">+12.5% from last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 fade-in">
          <h3 className="text-lg font-semibold mb-2">Customer Retention</h3>
          <p className="text-3xl font-bold text-primary-600">68.7%</p>
          <p className="text-sm text-gray-500 mt-1">+5.2% from last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 fade-in">
          <h3 className="text-lg font-semibold mb-2">Order Completion</h3>
          <p className="text-3xl font-bold text-primary-600">94.2%</p>
          <p className="text-sm text-gray-500 mt-1">+2.1% from last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 fade-in">
          <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-primary-600">4.8</p>
          <p className="text-sm text-gray-500 mt-1">+0.3 from last month</p>
        </div>
      </div> */}

      {/* Charts
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart 
          title="Revenue Trends"
          data={monthlyRevenueData}
          xKey="month"
          lines={[
            { dataKey: 'revenue', name: 'Revenue ($)', color: '#22c55e', strokeWidth: 3 }
          ]}
        />
        <LineChart 
          title="User Growth"
          data={userActivityData}
          xKey="month"
          lines={[
            { dataKey: 'newUsers', name: 'New Users', color: '#f97316' },
            { dataKey: 'activeUsers', name: 'Active Users', color: '#3b82f6' }
          ]}
        />
      </div> */}

      {/* <BarChart 
        title="Restaurant Performance"
        data={topRestaurantsData}
        xKey="name"
        bars={[
          { dataKey: 'orders', name: 'Orders', color: '#3b82f6' },
          { dataKey: 'revenue', name: 'Revenue ($)', color: '#14b8a6' }
        ]}
      /> */}

      {/* Detailed Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 fade-in">
          <h3 className="text-lg font-semibold mb-4">Peak Hours</h3>
          <div className="space-y-4">
            {[
              { time: '12:00 PM - 1:00 PM', orders: 245, percentage: 85 },
              { time: '7:00 PM - 8:00 PM', orders: 198, percentage: 68 },
              { time: '6:00 PM - 7:00 PM', orders: 167, percentage: 58 },
            ].map((hour, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{hour.time}</span>
                  <span>{hour.orders} orders</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${hour.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 fade-in">
          <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
          <div className="space-y-4">
            {[
              { category: 'Main Course', orders: 1245, percentage: 92 },
              { category: 'Appetizers', orders: 856, percentage: 63 },
              { category: 'Desserts', orders: 654, percentage: 48 },
            ].map((category, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{category.category}</span>
                  <span>{category.orders} orders</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Analytics;