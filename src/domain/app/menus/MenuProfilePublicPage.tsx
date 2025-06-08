'use client'

import React, { useEffect, useState } from 'react';
import {
    Utensils,
    MessageSquare,
    GalleryHorizontal
} from 'lucide-react';
import Tabs from '@/infrastructure/components/restaurant/Tabs';
import ReviewsSection from '@/infrastructure/components/sections/restaurant/Reviews';
import { useMenusCrud } from '@/application/hooks/useMenus';
import { MenuType } from '@/infrastructure/interface/menu.type';
import MenuForm from '@/infrastructure/components/form/menu/MenuForm';
import MenuCard from '@/infrastructure/components/sections/menu/Content';
import FullScreenLoader from '@/infrastructure/components/common/Loadding';
import Footer from '@/infrastructure/layout/Footer';
import Header from '@/infrastructure/layout/Header';
import { useAuth } from '@/domain/context/AuthContext';
import Gallery from '@/infrastructure/components/common/upload/Gallery';


interface Props {
    id: string;
}

const MenuProfilePublicPage: React.FC<Props> = ({ id }) => {
    const { auth,restaurant } = useAuth();
    const menuCrud = useMenusCrud();

    const [menu, setMenu] = useState<MenuType | null>(null);
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // Close edit form when changing tabs
        if (isEditing) {
            setIsEditing(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Ficha', icon: <Utensils className="w-4 h-4" /> },
    ];

    if (auth) tabs.push({ id: 'reviews', label: 'Interaciones', icon: <MessageSquare className="w-4 h-4" /> });
    if (auth) tabs.push({ id: 'gallery', label: 'Galeria', icon: <GalleryHorizontal className="w-4 h-4" /> });

    useEffect(() => {
        (async () => {
            const result = await menuCrud.getMenuById(id);
            setMenu(result.response);
        })()
    }, [])

    return menuCrud.loading ? <FullScreenLoader /> : !menu ? <div>No hay resultados</div> : (
        <>
            <Header />
            <div className="space-y-6 mt-20">
                {/* Header */}
                <header className="">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="py-6">
                            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Ficha: {menu.name}</h1>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Navigation Tabs */}
                    <div className="mb-8">
                        <Tabs tabs={tabs} defaultTab="profile" onChange={handleTabChange} />
                    </div>

                    {/* Tab content */}
                    <div className="animate-fadeIn">
                        {activeTab === 'profile' && (
                            <div>
                                <MenuCard menu={menu} />
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <ReviewsSection reviews={[]} entity={menu} />
                        )}

                        {activeTab === 'gallery' && (
                            <Gallery id={id} use='MENU' />
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default MenuProfilePublicPage;
