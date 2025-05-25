// Mock data for the dashboard
export const restaurantStats = {
    total: 143,
    active: 128,
    pending: 15,
    growth: 12.4,
  };
  
  export const menuStats = {
    total: 876,
    active: 742,
    featured: 38,
    growth: 8.7,
  };
  
  export const userStats = {
    total: 2847,
    new: 156,
    returning: 1892,
    growth: 5.2,
  };
  
  export const revenueStats = {
    total: '$87,432',
    monthly: '$24,568',
    average: '$612',
    growth: 14.3,
  };
  
  // Top restaurants data
  export const topRestaurantsData = [
    { name: 'Bella Italia', orders: 1842, revenue: 32450 },
    { name: 'Spice Garden', orders: 1567, revenue: 28740 },
    { name: 'Oceanview Seafood', orders: 1345, revenue: 25890 },
    { name: 'Golden Dragon', orders: 1256, revenue: 24350 },
    { name: 'Urban Bistro', orders: 1187, revenue: 21980 },
  ];
  
  // Top menu items data
  export const topMenuItemsData = [
    { name: 'Margherita Pizza', orders: 842, revenue: 12630 },
    { name: 'Grilled Salmon', orders: 756, revenue: 13608 },
    { name: 'Beef Burger', orders: 724, revenue: 9412 },
    { name: 'Chicken Curry', orders: 687, revenue: 9618 },
    { name: 'Caesar Salad', orders: 654, revenue: 7848 },
  ];
  
  // Monthly revenue data
  export const monthlyRevenueData = [
    { month: 'Jan', revenue: 18500 },
    { month: 'Feb', revenue: 21200 },
    { month: 'Mar', revenue: 25400 },
    { month: 'Apr', revenue: 23800 },
    { month: 'May', revenue: 27600 },
    { month: 'Jun', revenue: 29200 },
    { month: 'Jul', revenue: 31500 },
    { month: 'Aug', revenue: 32400 },
    { month: 'Sep', revenue: 30800 },
    { month: 'Oct', revenue: 28900 },
    { month: 'Nov', revenue: 24500 },
    { month: 'Dec', revenue: 26700 },
  ];
  
  // User activity data
  export const userActivityData = [
    { month: 'Jan', newUsers: 120, activeUsers: 850 },
    { month: 'Feb', newUsers: 132, activeUsers: 920 },
    { month: 'Mar', newUsers: 141, activeUsers: 1020 },
    { month: 'Apr', newUsers: 124, activeUsers: 980 },
    { month: 'May', newUsers: 156, activeUsers: 1150 },
    { month: 'Jun', newUsers: 182, activeUsers: 1320 },
    { month: 'Jul', newUsers: 173, activeUsers: 1450 },
    { month: 'Aug', newUsers: 188, activeUsers: 1560 },
    { month: 'Sep', newUsers: 167, activeUsers: 1640 },
    { month: 'Oct', newUsers: 145, activeUsers: 1590 },
    { month: 'Nov', newUsers: 138, activeUsers: 1460 },
    { month: 'Dec', newUsers: 159, activeUsers: 1580 },
  ];
  
  // Recent comments
  export const recentComments = [
    {
      id: '1',
      type: 'comment',
      title: 'Sarah Johnson',
      description: 'The pasta at Bella Italia was amazing! Will definitely go back.',
      time: '10 minutes ago',
      user: { name: 'Sarah Johnson' },
    },
    {
      id: '2',
      type: 'comment',
      title: 'Michael Chen',
      description: 'Service at Spice Garden was a bit slow, but the food was worth the wait.',
      time: '32 minutes ago',
      user: { name: 'Michael Chen' },
    },
    {
      id: '3',
      type: 'comment',
      title: 'Emily Wilson',
      description: 'Best seafood I\'ve had in a long time! Oceanview doesn\'t disappoint.',
      time: '1 hour ago',
      user: { name: 'Emily Wilson' },
    },
    {
      id: '4',
      type: 'comment',
      title: 'David Rodriguez',
      description: 'Urban Bistro needs to update their menu, seems like it hasn\'t changed in months.',
      time: '3 hours ago',
      user: { name: 'David Rodriguez' },
    },
    {
      id: '5',
      type: 'comment',
      title: 'Lisa Thompson',
      description: 'Golden Dragon has the best Chinese food in the city, hands down!',
      time: '5 hours ago',
      user: { name: 'Lisa Thompson' },
    },
  ];
  
  // Recently added users
  export const recentUsers = [
    {
      id: '1',
      type: 'user',
      title: 'Amanda Parker',
      description: 'Joined as a regular user',
      time: '15 minutes ago',
      user: { name: 'Amanda Parker' },
    },
    {
      id: '2',
      type: 'user',
      title: 'Robert Johnson',
      description: 'Joined as a restaurant owner',
      time: '45 minutes ago',
      user: { name: 'Robert Johnson' },
    },
    {
      id: '3',
      type: 'user',
      title: 'Sophia Martinez',
      description: 'Joined as a regular user',
      time: '2 hours ago',
      user: { name: 'Sophia Martinez' },
    },
    {
      id: '4',
      type: 'user',
      title: 'Daniel Williams',
      description: 'Joined as a regular user',
      time: '4 hours ago',
      user: { name: 'Daniel Williams' },
    },
    {
      id: '5',
      type: 'user',
      title: 'Olivia Brown',
      description: 'Joined as a restaurant owner',
      time: '6 hours ago',
      user: { name: 'Olivia Brown' },
    },
  ];
  
  // Recent restaurant activity
  export const recentRestaurantActivity = [
    {
      id: '1',
      type: 'restaurant',
      title: 'New restaurant added',
      description: 'Sakura Japanese Grill has been added',
      time: '20 minutes ago',
      user: { name: 'Admin' },
    },
    {
      id: '2',
      type: 'restaurant',
      title: 'Restaurant updated',
      description: 'Bella Italia updated their business hours',
      time: '1 hour ago',
      user: { name: 'Restaurant Owner' },
    },
    {
      id: '3',
      type: 'restaurant',
      title: 'New restaurant added',
      description: 'Mediterranean Delights has been added',
      time: '3 hours ago',
      user: { name: 'Admin' },
    },
    {
      id: '4',
      type: 'restaurant',
      title: 'Restaurant verified',
      description: 'Spice Garden has been verified',
      time: '5 hours ago',
      user: { name: 'Admin' },
    },
    {
      id: '5',
      type: 'restaurant',
      title: 'Restaurant updated',
      description: 'Urban Bistro added new photos',
      time: '7 hours ago',
      user: { name: 'Restaurant Owner' },
    },
  ];