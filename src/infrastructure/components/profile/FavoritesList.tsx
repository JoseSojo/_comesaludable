"use client";

import React from 'react';

const FavoritesList = ({ favorites }: { favorites:any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {favorites.map(item => (
        <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <h3 className="font-medium text-gray-900">{item.title}</h3>
          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
            {item.type === 'course' ? 'Curso' : 'Libro'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;