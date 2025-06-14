'use client'

import React, { useEffect, useState } from 'react';
import {
    Camera,
    Utensils,
    Menu,
    MessageSquare
} from 'lucide-react';
import { useRestaurantCrud } from '@/application/hooks/useRestaurant';
import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';
import Tabs from '@/infrastructure/components/restaurant/Tabs';
import RestaurantForm from '@/infrastructure/components/form/restaurant/RestaurantForm';
import MenuSection from '@/infrastructure/components/sections/restaurant/Menu';
import RestaurantCard from '@/infrastructure/components/sections/restaurant/Content';
import { useAuth } from '@/domain/context/AuthContext';
import { Ubication } from '@/infrastructure/interface/map/map';
import CustomMapaCurrent from '@/infrastructure/components/common/map/CustomMapaCurrent';


interface Props {
    
}

const RestaurantProfile: React.FC<Props> = ({  }) => {
    const { restaurantData } = useAuth();
    
    const [id, setId] = useState(restaurantData && restaurantData.id ? restaurantData.id as string : null);
    const restaurantCrud = useRestaurantCrud();

    const [restaurant, setRestaurant] = useState<RestaurantsType | null>(restaurantData);
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [coordenadas, setCoordenadas] = useState<Ubication | null>(null);

    useEffect(() => {
        if(restaurantData && restaurantData.id) setId(restaurantData.id);
    }, [])

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // Close edit form when changing tabs
        if (isEditing) {
            setIsEditing(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Ficha', icon: <Utensils className="w-4 h-4" /> },
        { id: 'gallery', label: 'Galeria', icon: <Camera className="w-4 h-4" /> },
    ];

    useEffect(() => {
        if(!id) return;
        (async () => {
            const result = await restaurantCrud.getRestaurantById(id);
            setRestaurant(result.response);
        })()
    }, [])

    return !restaurant ? <div>No hay resultados</div> : (
        <div className="space-y-6">
            {/* Header */}
            <header className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <CustomMapaCurrent
                        ubications={
                            restaurant.latitud && restaurant.longitud 
                            ? { id:restaurant.id, latitud:restaurant.latitud, longitud:restaurant.longitud, nombre:restaurant.name }
                            : null 
                        }
                    />
                    <div className="py-6">
                        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Ficha: {restaurant.name}</h1>
                    </div>
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
                                    end={()=>{}}
                                />
                            ) : (
                                <RestaurantCard
                                    update={false}
                                    restaurant={restaurant}
                                    onEdit={() => setIsEditing(true)}
                                />
                            )}
                        </div>
                    )}

                    {activeTab === 'menu' && (
                        <MenuSection update={false} restaurantId={id as string} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default RestaurantProfile;