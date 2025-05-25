"use client"

import { useMenusCrud } from "@/application/hooks/useMenus";
import { useAuth } from "@/domain/context/AuthContext";
import PaginateSection from "@/infrastructure/components/common/PaginateSection";
import MenuPublicCard from "@/infrastructure/components/public/MenuPublicCard";
import Footer from "@/infrastructure/layout/Footer";
import Header from "@/infrastructure/layout/Header";
import { useState } from "react";

export default function MenuSearchPage() {
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<{ environment?: string, type?: string, param?: string }>({});
    const entity = useMenusCrud(page, 30, filter);
    const { auth } = useAuth();

    return (
        <>
            <Header />
            <main className="min-h-screen top-20 relative grid grid-cols-[0.25fr_1fr_0.25fr] mb-10">
                <section></section>
                <div className="grid place-items-center gap-5 lg:px-10 px-5 py-10">

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
