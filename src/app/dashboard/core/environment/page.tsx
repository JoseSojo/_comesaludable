'use client';

import React, { useEffect, useState } from 'react';
import { Search, Loader2, DeleteIcon, Eye } from 'lucide-react';
import { useEnvironmentCrud } from '@/application/hooks/core/useEnvironment';
import PaginateSection from '@/infrastructure/components/common/PaginateSection';
import Button from '@/infrastructure/components/ui/Button';
import Modal from '@/infrastructure/components/common/Modal';
import EnvironmentForm from '@/infrastructure/components/form/core/EnvironmentForm';
import EnvironmentFicha from '@/infrastructure/components/core/unique/EnvironmentUnique';
import DeleteAlert from '@/infrastructure/components/common/DeleteAlert';

export default function EnvironementPage() {
    const [modalForm, setModalForm] = useState(false);
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<{ environment?: string, type?: string, param?: string }>({});
    const entity = useEnvironmentCrud(page, 10, filter);
    const [searchInput, setSearchInput] = useState('')
    const [selectId, setSelectId] = useState<string | null>(null);
    const [selectIdDelete, setSelectIdDelete] = useState<string | null>(null);

    // Este useEffect aplica el debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilter((prev) => ({ ...prev, param: searchInput }));
        }, 300);

        return () => clearTimeout(timeout); // limpia el timeout si se actualiza antes de los 300ms
    }, [searchInput]);

    const Delete = async () => {
        
    }

    return (
        <>
            <Modal isOpen={modalForm} onClose={() => setModalForm(true)}>
                <EnvironmentForm initialData={null} end={() => setModalForm(false)} />
            </Modal>

            {
                selectId && <Modal isOpen={selectId ? true : false} onClose={() => setSelectId(null)}>
                    <EnvironmentFicha close={()=>setSelectId(null)} id={selectId} />
                </Modal>
            }

            {
                selectIdDelete && <Modal isOpen={selectIdDelete ? true : false} onClose={() => setSelectIdDelete(null)}>
                    <DeleteAlert deleteFn={()=> {entity.deleteEnvironment(selectIdDelete); setSelectIdDelete(null)}} />
                </Modal>
            }

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="dark:text-gray-50 text-2xl font-bold">Ambiente</h1>
                        <p className="text-gray-500 dark:text-gray-400">Gestionar todos los ambientes que forman parte de come saludable.</p>
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
                            placeholder="buscar ambientes..."
                            className="dark:border-gray-600 dark:text-gray-600 relative border border-gray-300 py-3 rounded-md pl-10"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <Button click={() => setModalForm(true)} text='Crear' />
                    </div>
                </div>

                {/* Menu Items Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-sm">
                            <tr>
                                <th className="py-3 px-4 text-left font-medium">Nombre {selectIdDelete}</th>
                                <th className="py-3 px-4 text-left font-medium">Restaurantes</th>
                                <th className="py-3 px-4 text-right font-medium"></th>
                            </tr>
                        </thead>

                        {
                            entity.loading
                                ? <div className='w-full py-5 flex justify-center items-center'><Loader2 className='animate animate-spin' /></div>
                                : <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                                    {entity.list.map((item) => (
                                        <tr key={item.id} className=" ">
                                            <td className="py-3 px-4 font-medium">{item.name}</td>
                                            <td className="py-3 px-4 font-medium">{item._count.restaurant}</td>
                                            <td className="py-3 px-4 text-right">
                                                <button onClick={()=>setSelectId(item.id)} className="px-2 mx-1 rounded text-white bg-emerald-600 hover:bg-emerald-800 dark:bg-emerald-400 dark:hover:bg-emerald-300 font-medium">
                                                    <Eye />
                                                </button>
                                                <button onClick={()=>setSelectIdDelete(item.id)} className="px-2 mx-1 rounded text-white bg-red-600 hover:bg-red-800 dark:bg-red-700 dark:hover:bg-red-600 font-medium">
                                                    <DeleteIcon />
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
