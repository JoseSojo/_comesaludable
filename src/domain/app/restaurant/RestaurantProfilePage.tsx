'use client'

import React, { useEffect, useState } from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Star,
    Edit,
    Plus,
    Camera,
    Utensils,
    Menu,
    MessageSquare
} from 'lucide-react';
import { useRestaurantCrud } from '@/application/hooks/useRestaurant';
import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';
import Tabs from '@/infrastructure/components/restaurant/Tabs';
import RestaurantForm from '@/infrastructure/components/form/restaurant/RestaurantForm';
import GallerySection from '@/infrastructure/components/sections/restaurant/Gallery';
import MenuSection from '@/infrastructure/components/sections/restaurant/Menu';
import RestaurantCard from '@/infrastructure/components/sections/restaurant/Content';
import ReviewsSection from '@/infrastructure/components/sections/restaurant/Reviews';


interface Props {
    id: string;
}

export default function RestaurantProfilePage({ id }: Props) {
    const restaurantCrud = useRestaurantCrud();

    const [restaurant, setRestaurant] = useState<RestaurantsType | null>(null);
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
        { id: 'menu', label: 'Menus', icon: <Menu className="w-4 h-4" /> },
        { id: 'gallery', label: 'Galeria', icon: <Camera className="w-4 h-4" /> },
        { id: 'reviews', label: 'Interaciones', icon: <MessageSquare className="w-4 h-4" /> },
    ];

    useEffect(() => {
        (async () => {
            const result = await restaurantCrud.getRestaurantById(id);
            console.log(result.response);
            setRestaurant(result.response);
        })()
    }, [])

    return !restaurant ? <div>No hay resultados</div> : (
        <div className="space-y-6">
            {/* Header */}
            <header className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Ficha: {restaurant.name}</h1>
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
                            {isEditing ? (
                                <RestaurantForm
                                    typeForm='update'
                                    title='Actualizar'
                                    initialData={restaurant}
                                    end={() => { }}
                                />
                            ) : (
                                <RestaurantCard
                                    update
                                    restaurant={restaurant}
                                    onEdit={() => setIsEditing(true)}
                                />
                            )}
                        </div>
                    )}

                    {activeTab === 'menu' && (
                        <MenuSection update restaurantId={id} />
                    )}

                    {activeTab === 'gallery' && (
                        <GallerySection images={[]} />
                    )}

                    {activeTab === 'reviews' && (
                        <ReviewsSection reviews={[]} />
                    )}
                </div>
            </main>
        </div>
    );
};
