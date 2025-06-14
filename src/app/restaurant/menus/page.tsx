'use client';

import React, { useEffect, useState } from 'react';
import { Search, Loader2, Eye, DeleteIcon, Edit } from 'lucide-react';
import { useMenusCrud } from '@/application/hooks/useMenus';
import SearchSelect from '@/infrastructure/components/common/SelectInput';
import { useCategoryCrud } from '@/application/hooks/core/useCategory';
import { useTypeCrud } from '@/application/hooks/core/useType';
import PaginateSection from '@/infrastructure/components/common/PaginateSection';
import Link from 'next/link';
import { useAuth } from '@/domain/context/AuthContext';
import ButtonUiRestaurant from '@/infrastructure/components/restaurant/ButtonUiRestaurant';
import Modal from '@/infrastructure/components/common/Modal';
import MenuForm from '@/infrastructure/components/form/menu/MenuForm';
import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';
import { MenuType } from '@/infrastructure/interface/menu.type';


export default function Menus() {
    const [page, setPage] = useState(1)
    const auth = useAuth();
    const restaurantData = auth.restaurantData as RestaurantsType;
    const [filter, setFilter] = useState<{ category?: string, type?: string, param?: string, restaurant: string }>({ restaurant: restaurantData ? restaurantData.id : `` });
    const entity = useMenusCrud(page, 10, filter);
    const [searchInput, setSearchInput] = useState('');
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState<MenuType | null>(null);
    
    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');

    const category = useCategoryCrud(1,30,{ param:query1 });
    const type = useTypeCrud(1,30,{ param:query2 });
    
    const HandleChangeSelectFilter = (selected: any, name: string) => {
        if (name === "category") setFilter({ ...filter, category: selected.id });
        if (name === "type") setFilter({ ...filter, type: selected.id });
    }

    // Este useEffect aplica el debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilter((prev) => ({ ...prev, param: searchInput }));
        }, 300);

        return () => clearTimeout(timeout); // limpia el timeout si se actualiza antes de los 300ms
    }, [searchInput]);

    return (
        <>
            {
                createModal && <Modal isOpen={createModal ? true : false} onClose={() => setCreateModal(false)}>
                    <MenuForm initialData={null} restaurantId={restaurantData.id} end={() => { setCreateModal(false) }} />
                </Modal>
            }
            {
                updateModal && <Modal isOpen={updateModal ? true : false} onClose={() => setUpdateModal(false)}>
                    <MenuForm typeForm='update' initialData={updateData} restaurantId={restaurantData.id} end={() => { setUpdateModal(false) }} />
                </Modal>
            }
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="dark:text-gray-50 text-2xl font-bold">Menus</h1>
                        <p className="text-gray-500 dark:text-gray-400">Gestionar todos los elementos del menú en todos los restaurantes</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="buscar menus..."
                            className="dark:border-gray-600 dark:text-gray-600 relative border border-gray-300 py-3 rounded-md pl-10"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <div className='relative'>
                            <SearchSelect query={query1} setQuery={setQuery1} options={category.list} onChange={HandleChangeSelectFilter} placeholder='Categoría' name='category' />
                        </div>
                        <div className='relative'>
                            <SearchSelect query={query2} setQuery={setQuery2} options={type.list} onChange={HandleChangeSelectFilter} placeholder='Tipos' name='type' />
                        </div>
                        <ButtonUiRestaurant onClick={() => setCreateModal(true)} size='sm' className='bg-emerald-400 hover:bg-emerald-600'>Crear</ButtonUiRestaurant>

                    </div>
                </div>

                {/* Menu Items Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-sm">
                            <tr>
                                <th className="py-3 px-4 text-left font-medium">Nombre</th>
                                <th className="py-3 px-4 text-left font-medium">Restaurante</th>
                                <th className="py-3 px-4 text-left font-medium">Categoría</th>
                                <th className="py-3 px-4 text-left font-medium">Tipo</th>
                                <th className="py-3 px-4 text-left font-medium">Aprobado</th>
                                <th className="py-3 px-4 text-left font-medium">Costo</th>
                                <th className="py-3 px-4 text-right font-medium"></th>
                            </tr>
                        </thead>

                        {
                            entity.loading
                                ? <tbody>
                                    <tr>
                                        <td className='w-full py-5 flex justify-center items-center'><Loader2 className='animate animate-spin' /></td>
                                    </tr>
                                </tbody>
                                : <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                    {entity.list.map((item) => (
                                        <tr key={item.id} className=" ">
                                            <td className="py-3 px-4 font-medium">{item.name}</td>
                                            <td className="py-3 px-4">{item.restauranteReference.name}</td>
                                            <td className="py-3 px-4">{item.categoryReference.name}</td>
                                            <td className="py-3 px-4">{item.typeReference.name}</td>
                                            <td className="py-3 px-4">
                                                {
                                                    item.aproved
                                                    ? <span className='px-4 py-1 text-xs font-black bg-emerald-500 text-white rounded-[20px]'>si</span>
                                                    : <span className='px-4 py-1 text-xs font-black bg-gray-300 rounded-[20px]'>no</span>
                                                }
                                            </td>
                                            <td className="py-3 px-4">{item.price} $</td>
                                            <td className="py-3 px-4 text-right">
                                                <Link href={`/restaurant/menus/${item.id}`}>
                                                    <button className="px-2 mx-1 rounded text-white bg-emerald-600 hover:bg-emerald-800 dark:bg-emerald-400 dark:hover:bg-emerald-300 font-medium">
                                                        <Eye />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setUpdateData(item);
                                                        setUpdateModal(true);
                                                    }}
                                                    className="px-2 mx-1 rounded text-white bg-amber-600 hover:bg-amber-800 dark:bg-amber-400 dark:hover:bg-amber-300 font-medium">
                                                    <Edit />
                                                </button>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                        }

                    </table>
                </div>

                {/* Pagination */}
                <PaginateSection long={entity.list.length} page={page} total={entity.total} next={() => setPage(page + 1)} prev={() => setPage(page - 1)} />
            </div>
        </>
    );
};
