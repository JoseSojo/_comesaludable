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
import MapaClickCoordenadas from '@/infrastructure/components/common/map/MapaClickCoordenadas';
import { Ubication } from '@/infrastructure/interface/map/map';
import toast from 'react-hot-toast';


interface Props {
    id: string;
}

export default function wRestaurantProfilePage({ id }: Props) {
    const restaurantCrud = useRestaurantCrud();

    const [restaurant, setRestaurant] = useState<RestaurantsType | null>(null);
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [coordenadas, setCoordenadas] = useState<Ubication | null>(null);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // Close edit form when changing tabs
        if (isEditing) {
            setIsEditing(false);
        }
    };

    const SaveCoordenadas = (lat: number, lng: number) =>  {
        (async () => {
            const response = await restaurantCrud.createOrUpdateLocation(id, { latitud:lat, longitud:lng });
            return toast(response.message);
        })()
    } 

    const tabs = [
        { id: 'profile', label: 'Ficha', icon: <Utensils className="w-4 h-4" /> },
        { id: 'menu', label: 'Menus', icon: <Menu className="w-4 h-4" /> },
        { id: 'reviews', label: 'Interaciones', icon: <MessageSquare className="w-4 h-4" /> },
    ];

    useEffect(() => {
        (async () => {
            const result = await restaurantCrud.getRestaurantById(id);
            setRestaurant(result.response);
            const locations: Ubication[] = []; 
            result.response.locations.forEach(item => {
                if(item.latitud && item.longitud) locations.push({ id:item.id,latitud:item.latitud,longitud:item.longitud,nombre:result.response.name });
            })
            if(result.response.latitud && result.response.longitud) setCoordenadas({ id:"current_location",latitud:result.response.latitud, longitud:result.response.longitud, nombre:result.response.name });
        })()
    }, [])

    return !restaurant ? <div>No hay resultados</div> : (
        <div className="space-y-6">
            {/* Header */}
            <header className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <MapaClickCoordenadas
                        location={coordenadas}
                        saveCoordenadas={SaveCoordenadas}
                    />
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

                    {/* {activeTab === 'reviews' && (
                        <ReviewsSection reviews={[]} />
                    )} */}
                </div>
            </main>
        </div>
    );
};
