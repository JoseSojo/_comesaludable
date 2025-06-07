"use client"

// src/components/MapaClickCoordenadas.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Ubication } from '@/infrastructure/interface/map/map';

const DefaultIcon = L.icon({
    iconUrl: "/ico/marker-icon.png",
    shadowUrl: "/ico/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Componente que escucha los clics en el mapa
const MapaClickHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            onMapClick(lat, lng);
        },
    });
    return null;
};

interface Props {
    onCoordenadasClick?: (lat: number, lng: number) => void; // Callback opcional;
    location: Ubication | null;
    saveCoordenadas?: (lat: number, lng: number) => void; // Callback opcional;

}

const MapaClickCoordenadas: React.FC<Props> = ({ onCoordenadasClick, location, saveCoordenadas }) => {
    
    const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number } | null>(null);

    const handleMapClick = (lat: number, lng: number) => {
        setCoordenadas({ lat, lng });
        if (onCoordenadasClick) {
            onCoordenadasClick(lat, lng); // Enviar coordenadas al componente padre si es necesario
        }
    };

    return (
        <MapContainer
            center={[8.5379, -66.3650]} // Venezuela por defecto
            zoom={6}
            style={{ height: '500px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Componente que maneja los clics */}
            <MapaClickHandler onMapClick={handleMapClick} />

            {/* Mostrar marcador en la última posición clickeada */}
            {
                location && (
                    <Marker key={location.id} position={[location.latitud, location.longitud]}>
                        <Popup>
                            <div>
                                <strong>Ubicación:</strong>
                                <p>Latitud: {location.latitud}</p>
                                <p>Longitud: {location.longitud}</p>
                            </div>
                        </Popup>
                    </Marker>
                )
            }

            {/* Mostrar marcador en la última posición clickeada */}
            {coordenadas && (
                <Marker position={[coordenadas.lat, coordenadas.lng]}>
                    <Popup>
                        <div>
                            <strong>Coordenadas:</strong>
                            <p>Latitud: {coordenadas.lat}</p>
                            <p>Longitud: {coordenadas.lng}</p>
                            <button onClick={() => {if(saveCoordenadas) saveCoordenadas(coordenadas.lat, coordenadas.lng)}} className='bg-emerald-300 px-3 py-1 rounded text-xs'>guardar</button>
                        </div>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapaClickCoordenadas;