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
    location: Ubication | null;
}

const MapCurrent: React.FC<Props> = ({ location }) => {

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
        </MapContainer>
    );
};

export default MapCurrent;