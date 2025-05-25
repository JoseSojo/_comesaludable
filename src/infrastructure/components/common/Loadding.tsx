// src/components/FullScreenLoader.tsx
'use client';

import { Loader2 } from 'lucide-react'; // Icono de carga
import React from 'react';

const FullScreenLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black">
            <Loader2 className="h-12 w-12 animate-spin text-gray-800 dark:text-white" />
            <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                Cargando...
            </p>
        </div>
    );
};

export default FullScreenLoader;
