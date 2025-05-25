import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../../restaurant/Card';
import Button from '../../restaurant/ButtonUiRestaurant';
import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';

interface RestaurantCardProps {
  restaurant: RestaurantsType;
  onEdit: () => void;
  update: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onEdit, update=false }) => {
  
  return (
    <Card className="w-full">
      
      <CardContent>
        <div className="flex justify-between items-start mb-4">
          <div className='mr-4'>
            
            <div className="flex items-center gap-5 mb-1">
              {/* <PriceRange priceRange={restaurant.priceRange} /> */}
              <span className="text-gray-500 dark:text-gray-300 text-sm">{restaurant.about}</span>
            </div>
            {/* <p className="text-gray-700">{restaurant.description}</p> */}
          </div>
          {update && <Button variant="outline" onClick={onEdit}>
            Editar
          </Button>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <div className='mb-3'>
              <span className="text-white/90 px-3 mx-1 py-1 bg-gray-400 dark:bg-gray-700 rounded-[20px] font-black text-xs">{restaurant.environmentReference.name}</span>
              <span className="text-white/90 px-3 mx-1 py-1 bg-gray-400 dark:bg-gray-700 rounded-[20px] font-black text-xs">{restaurant.typeReference.name}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Direccion</h3>
            <p className="text-gray-800 dark:text-gray-200">{restaurant.address}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Contacto</h3>
            <p className="text-gray-800 dark:text-gray-200">{restaurant.phone}</p>
            <p className="text-gray-800 dark:text-gray-200">{restaurant.website}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-900">
        <div className="w-full">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{restaurant.horario}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;