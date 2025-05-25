import React from 'react';
import { Card, CardContent, CardFooter } from '../../restaurant/Card';
import Button from '../../restaurant/ButtonUiRestaurant';
import { MenuType } from '@/infrastructure/interface/menu.type';

interface MenuCardProps {
  menu: MenuType;
  onEdit?: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onEdit }) => {

  return (
    <Card className="w-full">

      <CardContent>
        <div className="flex justify-between items-start mb-4">
          <div className='mr-4'>

            <div className="flex items-center justify-between gap-5 mb-1">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full font-bold bg-primary-100 dark:bg-gray-950 dark:text-white flex items-center justify-center text-primary-700 dark:text-primary-400">
                  {menu.price} $
                </div>
                <div className="ml-3">
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">{menu.about}</p>
            </div>
          </div>
          {onEdit &&<Button variant="outline" onClick={onEdit}>
            Editar
          </Button>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <div className='mb-3'>
              <span className="text-white/90 px-3 mx-1 py-1 bg-gray-400 dark:bg-gray-700 rounded-[20px] text-xs">Categoria: <b>{menu.categoryReference.name}</b></span>
              <span className="text-white/90 px-3 mx-1 py-1 bg-gray-400 dark:bg-gray-700 rounded-[20px] text-xs">Tipo: <b>{menu.typeReference.name}</b></span>
            </div>
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-3'>
          <Card className='border rounded border-gray-500 dark:text-gray-300 text-gray-700'>
            <CardContent>
              <h2 className='text-center text-md font-bold '>Alergenos</h2>
              <div>
                {
                  menu.allergens.length === 0
                    ? <span className='text-gray-500'>No existen</span>
                    : <div className='flex flex-wrap gap-2 justify-center items-center'>
                      {
                        menu.allergens.map((item) => <span className='rounded-[20px] bg-gray-300 dark:bg-gray-900 dark:text-gray-500 text-xs px-3 py-1 font-bold text-gray-600' key={item}>{item}</span>)
                      }
                    </div>
                }
              </div>
            </CardContent>
          </Card>

          <Card className='border rounded border-gray-500 dark:text-gray-300 text-gray-700'>
            <CardContent>
              <h2 className='text-center text-md font-bold '>Ingredientes</h2>
              <div>
                {
                  menu.ingredients.length === 0
                    ? <span className='text-gray-500'>No existen</span>
                    : <div className='flex flex-wrap gap-2 justify-center items-center'>
                      {
                        menu.ingredients.map((item) => <span className='rounded-[20px] bg-gray-300 dark:bg-gray-900 dark:text-gray-500 text-xs px-3 py-1 font-bold text-gray-600' key={item}>{item}</span>)
                      }
                    </div>
                }
              </div>
            </CardContent>
          </Card>

          <Card className='border rounded border-gray-500 dark:text-gray-300 text-gray-700'>
            <CardContent>
              <h2 className='text-center text-md font-bold '>Palabras Clave</h2>
              <div>
                {
                  menu.tags.length === 0
                    ? <span className='text-gray-500'>No existen</span>
                    : <div className='flex flex-wrap gap-2 justify-center items-center'>
                      {
                        menu.tags.map((item) => <span className='rounded-[20px] bg-gray-300 dark:bg-gray-900 dark:text-gray-500 text-xs px-3 py-1 font-bold text-gray-600' key={item}>{item}</span>)
                      }
                    </div>
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;