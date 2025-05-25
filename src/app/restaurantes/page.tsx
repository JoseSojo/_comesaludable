"use client"

import { useRestaurantCrud } from "@/application/hooks/useRestaurant";
import FullScreenLoader from "@/infrastructure/components/common/Loadding";
import PaginateSection from "@/infrastructure/components/common/PaginateSection";
import RestaurantPublicCard from "@/infrastructure/components/public/RestaurantPublicCard";
import Footer from "@/infrastructure/layout/Footer";
import Header from "@/infrastructure/layout/Header";
import { useState } from "react";

export default function MenuSearchPage() {
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<{ environment?: string, type?: string, param?: string }>({});
    const entity = useRestaurantCrud(page, 10, filter);

    return entity.loading ? <FullScreenLoader /> : (
        <>
            <Header />

            <main className="min-h-screen top-20 relative grid grid-cols-[0.25fr_1fr_0.25fr] mb-10">
                <section></section>
                <div className="grid place-items-center gap-5 lg:px-10 px-5 py-10">
                    
                    {
                        entity.list.map((item) => <RestaurantPublicCard key={item.id} entity={item} />)
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
