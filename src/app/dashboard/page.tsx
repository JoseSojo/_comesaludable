'use client';

import React from 'react';
import { ChefHat, MenuSquare, Users, MessageCircle } from 'lucide-react';
import {
  topRestaurantsData,
  userActivityData,
} from '@/infrastructure/data';
import StatCard from '@/infrastructure/components/sections/dashboard/Cards';
import LineChart from '@/infrastructure/components/sections/dashboard/chart/LineChart';
import BarChart from '@/infrastructure/components/sections/dashboard/chart/BarChart';
import { useMenusCrud } from '@/application/hooks/useMenus';
import { useCommentCrud } from '@/application/hooks/interactions/useComment';
import { useRestaurantCrud } from '@/application/hooks/useRestaurant';
import CutomTags from '@/infrastructure/components/sections/dashboard/CustomTags';
import { useCategoryCrud } from '@/application/hooks/core/useCategory';
import { useTypeCrud } from '@/application/hooks/core/useType';
import { useEnvironmentCrud } from '@/application/hooks/core/useEnvironment';
import { useUserCrud } from '@/application/hooks/useUser';

const Dashboard: React.FC = () => {
  const menus = useMenusCrud(1, 0);
  const restaurant = useRestaurantCrud(1, 0);
  const comment = useCommentCrud(1, 0,{});
  const category = useCategoryCrud(1,50);
  const type = useTypeCrud(1,50);
  const user = useUserCrud(1,0);
  const environment = useEnvironmentCrud(1,50);

  // Transform data for top restaurants chart
  const topRestaurantsChartData = topRestaurantsData.map((item) => ({
    name: item.name,
    orders: item.orders,
    revenue: item.revenue
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="dark:text-gray-50 text-2xl font-bold">Panel de Control</h1>
        <p className="text-gray-500 dark:text-gray-400">Bienvenido. Aquí tienes una visión general de tu plataforma de ComeSaludable.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Restaurants"
          value={restaurant.total}
          loading={restaurant.loading}
          icon={<ChefHat className="h-6 w-6" />}
        />
        <StatCard
          title="Total Menus"
          value={menus.total}
          loading={menus.loading}
          icon={<MenuSquare className="h-6 w-6" />}
        />
        <StatCard
          title="Total Users"
          value={user.total}
          loading={user.loading}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Total Comentarios"
          value={comment.total}
          loading={comment.loading}
          icon={<MessageCircle className="h-6 w-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <BarChart
          title="Top Restaurant"
          data={topRestaurantsChartData}
          xKey="name"
          bars={[
            { dataKey: 'orders', name: 'Orders', color: '#3b82f6' },
            { dataKey: 'revenue', name: 'Revenue ($)', color: '#14b8a6' }
          ]}
        /> */}
        {/* <LineChart
          title="Usuarios - Nuevos y Activos"
          data={userActivityData}
          xKey="month"
          lines={[
            { dataKey: 'newUsers', name: 'New Users', color: '#f97316' },
            { dataKey: 'activeUsers', name: 'Active Users', color: '#3b82f6' }
          ]}
        /> */}
      </div>

      {/* Monthly Revenue Chart */}
      {/* <LineChart 
        title=""
        data={monthlyRevenueData}
        xKey="month"
        lines={[
          { dataKey: 'revenue', name: 'Revenue ($)', color: '#22c55e', strokeWidth: 3 }
        ]}
      /> */}

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CutomTags
          title="Categorías"
          tags={category.list}
          loadding={category.loading}
          viewAllLink="/dashboard/core/category"
        />
        <CutomTags
          title="Tipos"
          tags={type.list}
          loadding={type.loading}
          viewAllLink="/dashboard/core/type"
        />
        <CutomTags
          title="Ambientes"
          tags={environment.list}
          loadding={environment.loading}
          viewAllLink="/dashboard/core/environment"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <RecentActivityCard
          title="Recent Comments"
          activities={recentComments}
          viewAllLink="/comments"
        />
        <RecentActivityCard
          title="New Users"
          activities={recentUsers}
          viewAllLink="/users"
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;