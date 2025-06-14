'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useMenusCrud } from '@/application/hooks/useMenus';
import { useCategoryCrud } from '@/application/hooks/core/useCategory';
import { useTypeCrud } from '@/application/hooks/core/useType';
import SearchSelect from '../common/SelectInput';
import CardMenuPublic from '../menu/CardMenuPublic';

export default function MenuSection() {
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<{ category?: string, type?: string, param?: string, landing: boolean }>({ landing: true });
    const entity = useMenusCrud(page, 10, filter);

    const [searchInput, setSearchInput] = useState('');

    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');

    const category = useCategoryCrud(1, 30, { param: query1 });
    const type = useTypeCrud(1, 30, { param: query2 });

    const HandleChangeSelectFilter = (selected: any, name: string) => {
        if (name === "category") setFilter({ ...filter, category: selected.id });
        if (name === "type") setFilter({ ...filter, type: selected.id });
    }

    return (
        <section className="min-h-screen max-w-lg mx-auto">

            <div className="grid lg:grid-cols-2 gap-4 mb-10">
                <div className="relative flex-1 col-span-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="buscar restaurantes..."
                        className="w-full dark:border-gray-600 dark:text-gray-600 relative border border-gray-300 py-3 rounded-md pl-10"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>

                <div className='relative'>
                    <SearchSelect query={query1} setQuery={setQuery1} options={category.list} onChange={HandleChangeSelectFilter} placeholder='Categoría' name='category' />
                </div>
                <div className='relative'>
                    <SearchSelect query={query2} setQuery={setQuery2} options={type.list} onChange={HandleChangeSelectFilter} placeholder='Tipos' name='type' />
                </div>
            </div>

            <div className="space-y-6">
                {entity.list.map((item) => <CardMenuPublic key={item.id} item={item} />)}
            </div>
        </section>
    );
}