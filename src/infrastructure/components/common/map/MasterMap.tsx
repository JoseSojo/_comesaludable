'use client'

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Ubication } from '@/infrastructure/interface/map/map';
import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';

const DefaultIcon = L.icon({
    iconUrl: "",
    iconRetinaUrl: "",
    shadowUrl: "",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

L.Marker.prototype.options.icon = DefaultIcon;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

// Íconos personalizados
const iconoRestaurante = new L.DivIcon({
    html: '<div style="background: #FF6B6B; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">🍴</div>',
    className: 'icono-restaurante',
});

interface Props {
    restaurants: RestaurantsType[];
    zoomInicial?: number;
}

const MasterMap: React.FC<Props> = ({ restaurants, zoomInicial = 6 }) => {
    const [posicionActual, setPosicionActual] = React.useState<[number, number] | null>(null);

    // Obtener ubicación actual del usuario
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosicionActual([pos.coords.latitude, pos.coords.longitude]);
                },
                (err) => {
                    console.error("Error al obtener ubicación:", err);
                }
            );
        }
    }, []);

    // Centro del mapa: primera ubicación o posición actual (si existe)
    const centro: LatLngExpression = posicionActual || [9.5379, -67.3650]; // Venezuela por defecto

    return (
        <MapContainer
            center={centro}
            zoom={zoomInicial}
            style={{ height: '500px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {restaurants.map((restaurant) => {
                if (!restaurant.latitud) return <></>
                if (!restaurant.longitud) return <></>

                return (
                    <Marker
                        key={restaurant.id}
                        position={[restaurant.latitud, restaurant.longitud]}
                        icon={iconoRestaurante}
                    >
                        <Popup>
                            <div className="flex items-center gap-2">
                                restaurante
                                <strong>{restaurant.name}</strong>
                            </div>
                            <div className="flex items-center gap-2 my-2">
                                Horario
                                <strong className='text-xs'>{restaurant.horario}</strong>
                            </div>
                            <p className='flex gap-3'>
                                <span
                                    className='rounded-[20px] bg-gray-300 dark:bg-gray-900 dark:text-gray-500 text-xs px-3 py-1 font-bold text-gray-600'
                                >
                                    Ambiente: <b>{restaurant.environmentReference.name}</b>
                                </span>
                                <span
                                    className='rounded-[20px] bg-gray-300 dark:bg-gray-900 dark:text-gray-500 text-xs px-3 py-1 font-bold text-gray-600'
                                >
                                    Tipo: <b>{restaurant.typeReference.name}</b>
                                </span>
                            </p>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    );
};

export default MasterMap;