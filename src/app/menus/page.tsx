"use client"

import { useCategoryCrud } from "@/application/hooks/core/useCategory";
import { useTypeCrud } from "@/application/hooks/core/useType";
import { useMenusCrud } from "@/application/hooks/useMenus";
import { useAuth } from "@/domain/context/AuthContext";
import PaginateSection from "@/infrastructure/components/common/PaginateSection";
import SearchSelect from "@/infrastructure/components/common/SelectInput";
import MenuPublicCard from "@/infrastructure/components/public/MenuPublicCard";
import Footer from "@/infrastructure/layout/Footer";
import Header from "@/infrastructure/layout/Header";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function MenuSearchPage() {
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<{ category?: string, type?: string, param?: string, landing: true }>({ landing: true });
    const entity = useMenusCrud(page, 30, filter);
    const { auth } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const category = useCategoryCrud();
    const type = useTypeCrud();

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
            <Header />
            <main className="min-h-screen top-20 relative grid grid-cols-[0.25fr_1fr_0.25fr] mb-10">
                <section></section>
                <div className="grid place-items-center gap-5 lg:px-10 px-5 py-10">
                    <h2 className="text-4xl font-black">Menus</h2>
                    <p className="text-md text-gray-500 dark:text-gray-600">Explora entre los más saludables, ricos, y nutritivos.</p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="buscar restaurantes..."
                                className="dark:border-gray-600 dark:text-gray-600 relative border border-gray-300 py-3 rounded-md pl-10"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <div className='relative'>
                                <SearchSelect options={category.list} onChange={HandleChangeSelectFilter} placeholder='Categoría' name='category' />
                            </div>
                            <div className='relative'>
                                <SearchSelect options={type.list} onChange={HandleChangeSelectFilter} placeholder='Tipos' name='type' />
                            </div>

                        </div>
                    </div>

                    {
                        entity.list.map((item) => <MenuPublicCard session={auth} entity={item} key={item.id} />)
                    }
                    <div className="w-full py-3">
                        <PaginateSection
                            long={entity.list.length}
                            next={() => setPage(page + 1)}
                            prev={() => setPage(page - 1)}
                            page={page}
                            total={entity.total}
                        />
                    </div>
                </div>
                <section></section>
            </main>
            <Footer />
        </>
    )
}
